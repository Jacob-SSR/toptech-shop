import { v2 as cloudinary } from "cloudinary";
import { useRuntimeConfig } from "#imports";

const config = useRuntimeConfig();

cloudinary.config({
  cloud_name: config.public.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

export default cloudinary;
