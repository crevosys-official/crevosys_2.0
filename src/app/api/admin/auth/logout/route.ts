import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Admin session locked successfully.",
  });

  response.cookies.delete("admin_session");
  response.cookies.delete("admin_otp_challenge");

  return response;
}
