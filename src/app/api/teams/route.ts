import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Team } from "@/models/Team";
import { DEFAULT_TEAM_MEMBERS } from "@/data/defaultTeam";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Auto-seed if collection is empty
    const count = await Team.countDocuments();
    if (count === 0 && Array.isArray(DEFAULT_TEAM_MEMBERS) && DEFAULT_TEAM_MEMBERS.length > 0) {
      await Team.insertMany(DEFAULT_TEAM_MEMBERS);
      console.log("🌱 First-time initial seed: Stored default team members into MongoDB");
    }

    const { searchParams } = new URL(req.url);
    const activeOnly = searchParams.get("active") === "true";
    const leadershipOnly = searchParams.get("leadership") === "true";
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};
    if (activeOnly) filter.isActive = true;
    if (leadershipOnly) filter.isLeadership = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { designation: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const team = await Team.find(filter)
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: team.length,
      data: team,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch team members";
    console.error("❌ Error fetching team:", error);
    return NextResponse.json({ success: false, error: message, data: [] }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      name,
      slug,
      designation,
      position,
      role,
      picture,
      education,
      bio,
      socialLinks,
      order,
      isActive,
      isLeadership,
    } = body;

    if (!name || !designation || !picture) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, designation, and member photo/picture are required",
        },
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

    const existing = await Team.findOne({ slug: computedSlug });
    if (existing) {
      computedSlug = `${computedSlug}-${Date.now().toString(36)}`;
    }

    let computedOrder = typeof order === "number" ? order : 0;
    if (computedOrder === 0) {
      const highest = await Team.findOne().sort({ order: -1 }).lean();
      computedOrder = (highest?.order || 0) + 1;
    }

    const computedRole =
      role || `${designation.trim()} • ${(position || designation).trim()}`;

    const newMember = await Team.create({
      name: name.trim(),
      slug: computedSlug,
      designation: designation.trim(),
      position: position ? position.trim() : designation.trim(),
      role: computedRole.trim(),
      picture: picture.trim(),
      education: education ? education.trim() : "Metropolitan University, Sylhet",
      bio: bio ? bio.trim() : "",
      socialLinks: socialLinks || {},
      order: computedOrder,
      isActive: typeof isActive === "boolean" ? isActive : true,
      isLeadership: typeof isLeadership === "boolean" ? isLeadership : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Team member created successfully",
        data: newMember,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create team member";
    console.error("❌ Error creating team member:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
