import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Feedback } from "@/models/Feedback";
import { DEFAULT_FEEDBACK } from "@/data/defaultFeedback";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed if collection is empty
    const count = await Feedback.countDocuments();
    if (count === 0 && Array.isArray(DEFAULT_FEEDBACK) && DEFAULT_FEEDBACK.length > 0) {
      await Feedback.insertMany(DEFAULT_FEEDBACK);
      console.log("🌱 First-time initial seed: Stored default feedback into MongoDB");
    }

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";
    const featuredOnly = searchParams.get("featured") === "true";
    const country = searchParams.get("country");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (activeOnly) filter.isActive = true;
    if (featuredOnly) filter.isFeatured = true;
    if (country && country !== "all") filter.sender_country = country;
    if (search) {
      filter.$or = [
        { feedback: { $regex: search, $options: "i" } },
        { sender_name: { $regex: search, $options: "i" } },
        { sender_country: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const feedbacks = await Feedback.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch feedback";
    console.error("❌ Error fetching feedback:", error);
    return NextResponse.json({ success: false, error: message, data: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      feedback,
      sender_name,
      sender_profile,
      sender_country,
      role,
      company,
      rating,
      date,
      order,
      isActive,
      isFeatured,
    } = body;

    if (!feedback || !sender_name || !sender_profile) {
      return NextResponse.json(
        {
          success: false,
          error: "Feedback text, client name, and client avatar/profile are required",
        },
        { status: 400 }
      );
    }

    let computedOrder = typeof order === "number" ? order : 0;
    if (computedOrder === 0) {
      const highest = await Feedback.findOne().sort({ order: -1 }).lean();
      computedOrder = (highest?.order || 0) + 1;
    }

    const newFeedback = await Feedback.create({
      feedback: feedback.trim(),
      sender_name: sender_name.trim(),
      sender_profile: sender_profile.trim(),
      sender_country: sender_country ? sender_country.trim() : "USA",
      role: role ? role.trim() : "Client",
      company: company ? company.trim() : "",
      rating: typeof rating === "number" ? rating : 5,
      date:
        date ||
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      order: computedOrder,
      isActive: typeof isActive === "boolean" ? isActive : true,
      isFeatured: typeof isFeatured === "boolean" ? isFeatured : false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback created successfully",
        data: newFeedback,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create feedback";
    console.error("❌ Error creating feedback:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
