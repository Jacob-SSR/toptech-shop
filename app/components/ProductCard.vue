<script setup lang="ts">
import type { Product } from "../../server/api/types/product";

defineProps<{
  product: Product;
}>();
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center overflow-hidden"
  >
    <NuxtLink
      :to="`/product/${product.brand.toLowerCase()}/${product.id}`"
      class="block w-full"
    >
      <img
        :src="
          product.images?.[0] ||
          product.detailImages?.[0] ||
          'https://placehold.co/400x400?text=No+Image'
        "
        :alt="product.name"
        class="w-full h-56 object-contain bg-white hover:scale-105 transition-transform duration-300"
      />
    </NuxtLink>

    <div class="p-4 text-center flex flex-col flex-grow">
      <h2 class="text-base font-semibold text-gray-900 line-clamp-1">
        {{ product.name }}
      </h2>
      <p class="text-sm text-gray-500 mb-2 capitalize">{{ product.brand }}</p>

      <div class="text-gray-700 mb-4">
        <p v-if="product.priceNew" class="text-sm text-red-600 font-semibold">
          มือ 1:
          <span class="text-gray-900 font-bold">
            ฿{{ product.priceNew.toLocaleString() }}
          </span>
        </p>
        <p v-if="product.priceUsed" class="text-sm text-gray-500">
          มือ 2:
          <span class="text-gray-800 font-medium">
            ฿{{ product.priceUsed.toLocaleString() }}
          </span>
        </p>
      </div>

      <NuxtLink
        :to="`/product/${product.brand.toLowerCase()}/${product.id}`"
        class="mt-auto w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 transition"
      >
        ดูเพิ่มเติม
      </NuxtLink>
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
