import { defineEventHandler, createError } from "h3";
import fs from "fs/promises";
import cloudinary from "../utils/cloudinary";

export const config = {
  api: { bodyParser: false },
};

export default defineEventHandler(async (event) => {
  let filePath: string | null = null;

  try {

    const { IncomingForm } = await import("formidable");

    const form = new IncomingForm({ multiples: false });
    const [fields, files] = await form.parse(event.node.req);

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    const file = fileArray[0];

    if (!file?.filepath) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file uploaded",
      });
    }

    filePath = file.filepath;

    if (typeof filePath !== "string") {
      throw new Error("Invalid file path");
    }

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "toptech_products",
    });

    await fs.unlink(filePath);

    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error: any) {
    console.error("Upload error:", error.message);

    if (filePath) {
      try {
        await fs.unlink(filePath);
      } catch (e) {
        console.error("Failed to delete temp file");
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Upload failed",
      data: { message: error.message },
    });
  }
});
