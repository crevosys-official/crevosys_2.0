import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fileDataUri = "";
    let folder = "crevosys";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const customFolder = formData.get("folder") as string | null;
      if (customFolder) folder = customFolder;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No file provided in form data" },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mime = file.type || "image/png";
      fileDataUri = `data:${mime};base64,${buffer.toString("base64")}`;
    } else {
      const body = await req.json();
      if (!body.image) {
        return NextResponse.json(
          { success: false, error: "Image data/URL is required" },
          { status: 400 }
        );
      }
      fileDataUri = body.image;
      if (body.folder) folder = body.folder;
    }

    const uploadResult = await uploadImageToCloudinary(fileDataUri, folder);

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully to Cloudinary",
      data: uploadResult,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("❌ Cloudinary upload error:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
