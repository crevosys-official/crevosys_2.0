import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const service = await Service.findById(id).lean();
    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch service";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const body = await req.json();
    const { _id, id: bodyId, ...updateData } = body;

    if (updateData.title && !updateData.slug) {
      updateData.slug = updateData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update service";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
      data: deletedService,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete service";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
