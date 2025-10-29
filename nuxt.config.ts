import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    externals: {
      inline: [
        "@prisma/client",
        ".prisma/client",
        "vue-bundle-renderer",
        "@vue/shared",
        "@vue/server-renderer",
      ],
      trace: false,
    },
    prerender: {
      crawlLinks: false,
      routes: ["/"],
    },
  },

  runtimeConfig: {
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  },

  modules: ["@nuxtjs/supabase"],

  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY,
    redirect: false,
  },

  experimental: {
    payloadExtraction: false,
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "TopTech Admin",
    },
  },

  typescript: {
    typeCheck: false,
  },
});
