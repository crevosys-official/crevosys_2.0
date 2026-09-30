import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import projectsData from "@/data/projects.json";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed only if collection is empty
    const totalCount = await Project.countDocuments();
    if (totalCount === 0 && Array.isArray(projectsData) && projectsData.length > 0) {
      const seedData = projectsData.map((p, index) => ({
        order: p.id || index + 1,
        title: p.title,
        slug: p.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        category: p.category,
        image: p.image,
        modalImage: p.modalImage || "",
        year: p.year,
        description: p.description,
        tech: p.tech || [],
        videoUrl: p.videoUrl || "#",
        live: p.live || "",
        isActive: true,
      }));
      await Project.insertMany(seedData);
      console.log("🌱 First-time initial seed: Stored default projects into MongoDB");
    }

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (activeOnly) filter.isActive = true;
    if (slug) filter.slug = slug.toLowerCase().trim();
    if (category && category !== "all") filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tech: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const projects = await Project.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    if (slug) {
      if (projects.length > 0) {
        return NextResponse.json({
          success: true,
          data: projects[0],
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Project not found", data: null },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch projects";
    console.error("❌ Error fetching projects:", error);
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
      slug,
      category,
      image,
      modalImage,
      year,
      description,
      tech,
      videoUrl,
      live,
      order,
      isActive,
    } = body;

    if (!title || !category || !image || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, category, main image, and description are required",
        },
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

    // Check slug uniqueness
    const existing = await Project.findOne({ slug: computedSlug });
    if (existing) {
      computedSlug = `${computedSlug}-${Date.now().toString(36)}`;
    }

    // Process tech tags
    let techArray: string[] = [];
    if (Array.isArray(tech)) {
      techArray = tech.map((t) => String(t).trim()).filter(Boolean);
    } else if (typeof tech === "string") {
      techArray = tech
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // Default order
    let computedOrder = typeof order === "number" ? order : 0;
    if (computedOrder === 0) {
      const highestOrderProject = await Project.findOne().sort({ order: -1 }).lean();
      computedOrder = (highestOrderProject?.order || 0) + 1;
    }

    const newProject = await Project.create({
      title: title.trim(),
      slug: computedSlug,
      category: category.trim(),
      image: image.trim(),
      modalImage: modalImage ? modalImage.trim() : "",
      year: year || new Date().getFullYear(),
      description: description.trim(),
      tech: techArray,
      videoUrl: videoUrl ? videoUrl.trim() : "#",
      live: live ? live.trim() : "",
      order: computedOrder,
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    console.error("❌ Error creating project:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
