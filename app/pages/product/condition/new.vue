<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductCard from "~/components/ProductCard.vue";

const products = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await axios.get("/api/products", {
      params: { condition: "new" },
    });
    products.value = res.data.products || res.data;
  } catch (err) {
    console.error("Error loading new products:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen py-10 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          สินค้ามือ<span class="text-red-600">1</span>
        </h1>
        <NuxtLink
          to="/product"
          class="text-sm text-gray-600 hover:text-red-600 transition"
        >
          ← กลับหน้าสินค้าทั้งหมด
        </NuxtLink>
      </div>

      <div v-if="loading" class="text-center text-gray-500 py-10">
        กำลังโหลดข้อมูล...
      </div>

      <div
        v-else-if="!products.length"
        class="text-center text-gray-500 py-10 text-lg"
      >
        ไม่มีสินค้าประเภท “มือ 1”
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
      >
        <div
          v-for="n in 8"
          :key="n"
          class="bg-white rounded-xl shadow animate-pulse p-4 flex flex-col gap-3"
        >
          <div class="w-full h-44 bg-gray-200 rounded-md" />
          <div class="h-4 w-3/4 bg-gray-200 rounded" />
          <div class="h-3 w-1/2 bg-gray-200 rounded" />
          <div class="h-5 w-1/3 bg-gray-200 rounded" />
        </div>
      </div>

      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>
