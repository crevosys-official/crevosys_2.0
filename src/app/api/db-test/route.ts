import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const conn = await connectDB();
    return NextResponse.json({
      status: "connected",
      host: conn.connection.host,
      database: conn.connection.name,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message: errMessage },
      { status: 500 }
    );
  }
}
