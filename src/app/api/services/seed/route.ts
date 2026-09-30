import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Service } from "@/models/Service";
import { DEFAULT_SERVICES } from "@/data/defaultServices";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let force = false;
    try {
      const body = await req.json();
      force = Boolean(body?.force);
    } catch {
      // Body may be empty
    }

    if (force) {
      await Service.deleteMany({});
      await Service.insertMany(DEFAULT_SERVICES);
      const seeded = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
      return NextResponse.json({
        success: true,
        message: "Services database reset and re-seeded successfully",
        count: seeded.length,
        data: seeded,
      });
    }

    // Otherwise, insert only if not already present by slug or title
    let insertedCount = 0;
    for (const item of DEFAULT_SERVICES) {
      const exists = await Service.findOne({
        $or: [{ title: item.title }, { slug: item.slug }],
      });
      if (!exists) {
        await Service.create(item);
        insertedCount++;
      }
    }

    const currentServices = await Service.find().sort({ order: 1, createdAt: 1 }).lean();

    return NextResponse.json({
      success: true,
      message:
        insertedCount > 0
          ? `Seeded ${insertedCount} default service(s) into MongoDB`
          : "Default services are already present in MongoDB. Custom services preserved.",
      count: currentServices.length,
      data: currentServices,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to seed services";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  return POST(new NextRequest("http://localhost:3000/api/services/seed", { method: "POST" }));
}
