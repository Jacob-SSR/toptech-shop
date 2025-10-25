<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
  const res = await axios.get("/api/products");
  products.value = res.data.products || res.data;
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <h1 class="text-3xl font-bold text-center mb-8">สินค้าทั้งหมด</h1>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="p in products"
        :key="p.id"
        class="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
      >
        <img
          :src="p.images?.[0] || '/no-image.png'"
          alt="product"
          class="w-full h-56 object-cover rounded-lg"
        />
        <div class="mt-3 space-y-1">
          <h2 class="text-lg font-semibold line-clamp-1">{{ p.name }}</h2>
          <p class="text-gray-600 text-sm">{{ p.brand }}</p>
          <p class="text-red-500 font-bold">฿{{ p.offerPrice || p.price }}</p>
        </div>
        <NuxtLink
          :to="`/product/${p.id}`"
          class="block mt-3 text-center bg-red-500 hover:bg-red-600 text-white rounded-md py-2"
        >
          ดูเพิ่มเติม
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
