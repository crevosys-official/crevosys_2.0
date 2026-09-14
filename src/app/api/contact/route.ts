import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, source, message } = await req.json();

  const { data, error } = await resend.emails.send({
    from: "Crevosys <onboarding@resend.dev>", // TODO: Change this to noreply@crevosys.com once you verify the domain in Resend
    to: ["crevosysofficial@gmail.com"],
    subject: "New Contact Form Crevosys",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background-color: #09090b; padding: 30px; text-align: center;">
            <img src="https://www.crevosys.com/crevoicon.png" alt="Crevosys Logo" style="height: 48px; width: auto; margin-bottom: 16px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Inquiry Received</h1>
            <p style="color: #a1a1aa; margin: 8px 0 0 0; font-size: 14px;">A new contact form was submitted on crevosys.com</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; font-weight: 600;">Sender Details</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; width: 35%; color: #52525b; font-weight: 500;">Name:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #09090b; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #52525b; font-weight: 500;">Email:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #52525b; font-weight: 500;">Phone:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7; color: #09090b; font-weight: 600;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #52525b; font-weight: 500;">Source:</td>
                  <td style="padding: 12px 0; color: #09090b; font-weight: 600;">${source}</td>
                </tr>
              </table>
            </div>

            <div>
              <p style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; font-weight: 600;">Message</p>
              <div style="background-color: #f4f4f5; padding: 20px; border-radius: 8px; color: #3f3f46; line-height: 1.6; font-size: 15px; border: 1px solid #e4e4e7; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #fafafa; padding: 24px; text-align: center; border-top: 1px solid #e4e4e7;">
            <p style="margin: 0; color: #a1a1aa; font-size: 13px;">This email was generated from your website's contact form.</p>
            <p style="margin: 4px 0 0 0; color: #a1a1aa; font-size: 13px;">&copy; ${new Date().getFullYear()} Crevosys</p>
          </div>
        </div>
      </body>
      </html>
    `,
  });

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}
