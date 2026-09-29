import { NextRequest, NextResponse } from "next/server";
import {
  verifyOtpChallenge,
  createAdminJwtToken,
  SESSION_EXPIRY_SECONDS,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { code } = body;

    if (!code || typeof code !== "string" || code.trim().length !== 6) {
      return NextResponse.json(
        { success: false, error: "Please enter the full 6-digit verification code." },
        { status: 400 }
      );
    }

    const challengeToken = req.cookies.get("admin_otp_challenge")?.value;

    const verification = verifyOtpChallenge(challengeToken, code);
    if (!verification.valid) {
      return NextResponse.json(
        { success: false, error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    // Code is valid! Issue 2-day JWT admin session token
    const sessionToken = await createAdminJwtToken();
    const response = NextResponse.json({
      success: true,
      message: "Screen unlocked. Access granted for 2 days.",
      expiresInSeconds: SESSION_EXPIRY_SECONDS,
    });

    // Set authenticated session cookie (valid for 2 days = 48 hours)
    response.cookies.set({
      name: "admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_EXPIRY_SECONDS, // 2 days
    });

    // Clear the one-time OTP challenge cookie
    response.cookies.delete("admin_otp_challenge");

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[2FA Verify Code Exception]:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
