import { defineEventHandler, createError } from "h3";
import fs from "fs";
import { IncomingForm } from "formidable";
import cloudinary from "../utils/cloudinary";

export const config = {
  api: { bodyParser: false },
};

export default defineEventHandler(async (event) => {
  try {
    const form = new IncomingForm({ multiples: false });
    const [fields, files] = await form.parse(event.node.req);

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    const file = fileArray[0];

    if (!file || !file.filepath) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file uploaded",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(file.filepath, {
      folder: "toptech_products",
    });

    fs.unlinkSync(file.filepath);

    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    };
  } catch (error: any) {
    console.error("Upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Upload failed",
      message: error.message,
    });
  }
});
