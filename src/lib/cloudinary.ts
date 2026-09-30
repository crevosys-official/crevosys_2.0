import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "v8uaci4y",
  api_key: process.env.CLOUDINARY_API_KEY || "582297255665918",
  api_secret: process.env.CLOUDINARY_API_SECRET || "P5BViEAwxxp7ZonF4Bql-VtikfI",
  secure: true,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
}

/**
 * Upload a file buffer or base64 data URI to Cloudinary
 */
export async function uploadImageToCloudinary(
  fileOrDataUri: string,
  folder = "crevosys"
): Promise<CloudinaryUploadResult> {
  const result = await cloudinary.uploader.upload(fileOrDataUri, {
    folder,
    resource_type: "auto",
  });

  return {
    public_id: result.public_id,
    secure_url: result.secure_url,
    url: result.url,
    format: result.format,
    width: result.width,
    height: result.height,
  };
}

/**
 * Delete an image by its public_id
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}

export default cloudinary;
