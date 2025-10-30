import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["@/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    preset: "vercel",
    rollupConfig: {
      external: ["@prisma/client"],
      output: {
        manualChunks: {
          prisma: ["@prisma/client"],
        },
      },
    },
    externals: {
      inline: [
        "vue-bundle-renderer",
        "@vue/shared",
        "@vue/compiler-dom",
        "@vue/compiler-core",
      ],
      external: ["@prisma/client"],
    },
  },

  serverDir: "server",

  runtimeConfig: {
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY!,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET!,
    public: {
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME!,
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL!,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  },

  modules: ["@nuxtjs/supabase"],

  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL!,
    key: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY!,
    redirect: false,
  },

  ssr: true,

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
    typeCheck: true,
  },
});
