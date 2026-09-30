import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch project";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    const { _id, id: bodyId, ...updateData } = body;

    // Slug generation if title changes and slug not provided
    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Process tech tags if present
    if (updateData.tech !== undefined) {
      if (Array.isArray(updateData.tech)) {
        updateData.tech = updateData.tech.map((t: string) => String(t).trim()).filter(Boolean);
      } else if (typeof updateData.tech === "string") {
        updateData.tech = updateData.tech
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update project";
    console.error("❌ Error updating project:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete project";
    console.error("❌ Error deleting project:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
