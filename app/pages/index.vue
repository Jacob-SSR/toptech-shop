<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import type { Product } from "../../server/api/types/product";

const products = ref<Product[]>([]);

onMounted(async () => {
  const res = await axios.get<{ products: Product[] }>("/api/products");
  products.value = res.data.products || res.data;
});
</script>

<template>
  <div class="min-h-screen bg-[#f8f6f5] py-10 px-6">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="p in products"
        :key="p.id"
        class="bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-lg transition flex flex-col items-center"
      >
        <img
          :src="p.images?.[0] || '/no-image.png'"
          alt="product"
          class="w-full h-56 object-contain rounded-md"
        />

        <div class="mt-4 text-center">
          <h2 class="text-lg font-semibold text-gray-900 line-clamp-1">
            {{ p.name }}
          </h2>

          <p class="text-gray-600 text-sm">เริ่มต้นเพียง</p>

          <div class="mt-1 space-y-0.5 text-gray-800">
            <p v-if="p.priceNew" class="text-sm">
              มือ 1
              <span class="font-semibold text-gray-900">
                ฿{{ p.priceNew.toLocaleString() }}
              </span>
            </p>

            <p v-if="p.priceUsed" class="text-sm">
              มือ 2
              <span class="font-semibold text-gray-900">
                ฿{{ p.priceUsed.toLocaleString() }}
              </span>
            </p>
          </div>
        </div>

        <NuxtLink
          :to="`/product/${p.id}`"
          class="block mt-4 w-full text-center bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 transition"
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
