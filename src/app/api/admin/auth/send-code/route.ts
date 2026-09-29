import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  ADMIN_EMAIL,
  generateOtp,
  createOtpChallenge,
  renderOtpEmailHtml,
  renderOtpEmailText,
} from "@/lib/adminAuth";

export async function POST() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "RESEND_API_KEY is not configured in .env.local",
        },
        { status: 500 }
      );
    }

    const otp = generateOtp();
    const { token, expiresAt } = createOtpChallenge(otp);

    const fromEmail =
      process.env.RESEND_FROM_EMAIL?.trim() || "Crevosys <onboarding@resend.dev>";

    const resend = new Resend(resendApiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [ADMIN_EMAIL],
      replyTo: ADMIN_EMAIL,
      subject: `Your Crevosys verification code is ${otp}`,
      html: renderOtpEmailHtml(otp, expiresAt),
      text: renderOtpEmailText(otp, expiresAt),
      headers: {
        "X-Entity-Ref-ID": `crevosys-otp-${Date.now()}`,
      },
    });

    if (error) {
      console.error("[Resend 2FA Error]:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to dispatch 2FA code via Resend.",
        },
        { status: 500 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: `A 6-digit verification code was sent to ${ADMIN_EMAIL}`,
      expiresAt,
      expiresIn: 120,
    });

    // Store challenge token in HttpOnly cookie valid for 120 seconds
    response.cookies.set({
      name: "admin_otp_challenge",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 120, // 2 minutes strictly
    });

    return response;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    console.error("[2FA Send Code Exception]:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
