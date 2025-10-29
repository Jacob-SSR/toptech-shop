import formidable from 'formidable';
import { d as defineEventHandler, c as createError } from '../../_/nitro.mjs';
import fs from 'fs';
import { v2 } from 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || ""
});

const config = {
  api: { bodyParser: false }
};
const upload = defineEventHandler(async (event) => {
  try {
    const form = formidable({ multiples: false });
    const [fields, files] = await form.parse(event.node.req);
    const file = files.file?.[0];
    if (!file) {
      throw createError({ statusCode: 400, statusMessage: "No file uploaded" });
    }
    const uploadResult = await v2.uploader.upload(file.filepath, {
      folder: "toptech_products"
    });
    fs.unlinkSync(file.filepath);
    return {
      success: true,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Upload failed",
      message: error.message
    });
  }
});

export { config, upload as default };
//# sourceMappingURL=upload.mjs.map
