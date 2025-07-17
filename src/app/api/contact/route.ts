import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error: No types for nodemailer
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, phone, source, message } = await req.json();

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS, 
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "crevosysofficial@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>How did you hear about us?:</strong> ${source}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
