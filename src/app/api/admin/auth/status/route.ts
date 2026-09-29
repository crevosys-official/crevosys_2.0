import { NextRequest, NextResponse } from "next/server";
import {
  verifyAdminJwtToken,
  createAdminJwtToken,
  ADMIN_EMAIL,
  SESSION_EXPIRY_SECONDS,
} from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("admin_session")?.value;
    const result = await verifyAdminJwtToken(sessionToken);

    if (result.valid && result.payload) {
      const response = NextResponse.json({
        authenticated: true,
        email: result.payload.email || ADMIN_EMAIL,
        remainingSeconds: result.remainingSeconds,
      });

      // Maintain rolling 2-day window on active admin visits
      // If user uses admin within 2 days, session renews for another 2 days
      // If user does not log in for 2 days, it expires and prompts verification
      const renewedToken = await createAdminJwtToken();
      response.cookies.set({
        name: "admin_session",
        value: renewedToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_EXPIRY_SECONDS,
      });

      return response;
    }

    const response = NextResponse.json({
      authenticated: false,
      expired: Boolean(result.expired),
      message: result.expired
        ? "Admin session expired after 2 days without login. Please verify again."
        : "Not authenticated",
    });

    if (sessionToken) {
      response.cookies.delete("admin_session");
    }

    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      { authenticated: false, error: "Failed to check status" },
      { status: 500 }
    );
  }
}

