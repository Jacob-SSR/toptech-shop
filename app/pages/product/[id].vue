<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const product = ref<any>(null);

onMounted(async () => {
  const res = await axios.get(`/api/products/${route.params.id}`);
  product.value = res.data;
});

const lineUrl = "https://line.me/ti/p/~toptechplaza";
</script>

<template>
  <div v-if="product" class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- รูป -->
        <div>
          <img
            :src="product.images?.[0]"
            alt="product"
            class="w-full rounded-xl"
          />
          <div class="flex gap-2 mt-3">
            <img
              v-for="(img, i) in product.detailImages"
              :key="i"
              :src="img"
              class="w-20 h-20 object-cover rounded-md cursor-pointer hover:ring-2 hover:ring-red-400"
            />
          </div>
        </div>

        <div class="space-y-3">
          <h1 class="text-3xl font-bold">{{ product.name }}</h1>
          <p class="text-gray-500">{{ product.brand }}</p>
          <p class="text-xl text-red-500 font-semibold">
            ฿{{ product.offerPrice || product.price }}
          </p>
          <p class="text-sm text-gray-700 whitespace-pre-line">
            {{ product.description }}
          </p>
          <p>
            <span class="font-semibold">ประเภท:</span>
            {{ product.condition === "new" ? "มือ 1" : "มือ 2" }}
          </p>

          <a
            :href="lineUrl"
            target="_blank"
            class="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            💬 ติดต่อแอดมิน
          </a>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-10 text-gray-400">
    กำลังโหลดข้อมูลสินค้า...
  </div>
</template>
