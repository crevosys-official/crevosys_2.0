import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { DEFAULT_SERVICES } from "@/data/defaultServices";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // 1. First-time auto-seed check:
    // Only runs if MongoDB collection is completely empty.
    // Once data is stored, this will never run again on reload, keeping custom services intact.
    const totalCount = await Service.countDocuments();
    if (totalCount === 0) {
      await Service.insertMany(DEFAULT_SERVICES);
      console.log("🌱 First-time initial seed: Stored default services into MongoDB");
    }

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";
    const slug = searchParams.get("slug");

    const filter: Record<string, unknown> = {};
    if (activeOnly) filter.isActive = true;
    if (slug) filter.slug = slug.toLowerCase().trim();

    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    if (slug) {
      if (services.length > 0) {
        return NextResponse.json({
          success: true,
          data: services[0],
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Service not found", data: null },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch services";
    console.error("❌ Error fetching services:", error);
    return NextResponse.json(
      {
        success: false,
        error: message,
        data: [],
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      icon,
      slug,
      order,
      isActive,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      );
    }

    let computedSlug =
      slug ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Check if slug already exists; if so, make unique
    const existing = await Service.findOne({ slug: computedSlug });
    if (existing) {
      computedSlug = `${computedSlug}-${Date.now().toString(36)}`;
    }

    const newService = await Service.create({
      title: title.trim(),
      slug: computedSlug,
      description: description.trim(),
      icon: icon || "/card_icons/Icon.png",
      order: typeof order === "number" ? order : 0,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service created successfully",
        data: newService,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create service";
    console.error("❌ Error creating service:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
