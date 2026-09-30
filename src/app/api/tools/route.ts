import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tool } from "@/models/Tool";
import { DEFAULT_TOOLS } from "@/data/defaultTools";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed if collection is empty
    const totalCount = await Tool.countDocuments();
    if (totalCount === 0 && Array.isArray(DEFAULT_TOOLS) && DEFAULT_TOOLS.length > 0) {
      await Tool.insertMany(DEFAULT_TOOLS);
      console.log("🌱 First-time initial seed: Stored default tools into MongoDB");
    }

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (activeOnly) filter.isActive = true;
    if (category && category !== "all") filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const tools = await Tool.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    return NextResponse.json({
      success: true,
      count: tools.length,
      data: tools,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch tools";
    console.error("❌ Error fetching tools:", error);
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
    const { name, slug, icon, category, isWhite, order, isActive } = body;

    if (!name || !icon) {
      return NextResponse.json(
        { success: false, error: "Tool name and icon are required" },
        { status: 400 }
      );
    }

    let computedSlug =
      slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const existing = await Tool.findOne({ slug: computedSlug });
    if (existing) {
      computedSlug = `${computedSlug}-${Date.now().toString(36)}`;
    }

    let computedOrder = typeof order === "number" ? order : 0;
    if (computedOrder === 0) {
      const highest = await Tool.findOne().sort({ order: -1 }).lean();
      computedOrder = (highest?.order || 0) + 1;
    }

    const newTool = await Tool.create({
      name: name.trim(),
      slug: computedSlug,
      icon: icon.trim(),
      category: category ? category.trim() : "General",
      isWhite: typeof isWhite === "boolean" ? isWhite : false,
      order: computedOrder,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Tool created successfully",
        data: newTool,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create tool";
    console.error("❌ Error creating tool:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
