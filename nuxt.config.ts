import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY!,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET!,
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    },
  },
});
