import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tool } from "@/models/Tool";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const tool = await Tool.findById(id).lean();
    if (!tool) {
      return NextResponse.json(
        { success: false, error: "Tool not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: tool });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch tool";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    const { _id, id: bodyId, ...updateData } = body;

    if (updateData.name && !updateData.slug) {
      updateData.slug = updateData.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const updatedTool = await Tool.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTool) {
      return NextResponse.json(
        { success: false, error: "Tool not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tool updated successfully",
      data: updatedTool,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update tool";
    console.error("❌ Error updating tool:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deletedTool = await Tool.findByIdAndDelete(id);
    if (!deletedTool) {
      return NextResponse.json(
        { success: false, error: "Tool not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Tool deleted successfully",
      data: deletedTool,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete tool";
    console.error("❌ Error deleting tool:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
