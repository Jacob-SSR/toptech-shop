<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const brand = computed(() => route.params.brand as string);
const id = computed(() => route.params.id as string);

const product = ref<any>(null);
const selectedImage = ref<string>("");
const quantity = ref(1);

onMounted(async () => {
  try {
    const res = await axios.get(`/api/products/${id.value}`);
    if (!res.data) {
      router.push("/product");
      return;
    }

    product.value = res.data.product || res.data;
    selectedImage.value =
      product.value.images?.[0] ||
      product.value.detailImages?.[0] ||
      "https://placehold.co/600x600?text=No+Image";
  } catch (err) {
    console.error("Error loading product:", err);
    router.push("/product");
  }
});

const setImage = (url: string) => {
  selectedImage.value = url;
};

const goBack = () => router.back();

const increase = () => {
  if (product.value && quantity.value < product.value.stock) quantity.value++;
};

const decrease = () => {
  if (quantity.value > 1) quantity.value--;
};
</script>

<template>
  <div v-if="product" class="min-h-screen py-10 px-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-[1fr_1fr] gap-10">
      <div class="flex gap-4">
        <div class="flex flex-col gap-3">
          <img
            v-for="(img, i) in [
              ...(product.images || []),
              ...(product.detailImages || []),
            ]"
            :key="i"
            :src="img"
            class="w-20 h-20 object-cover rounded-md border cursor-pointer hover:ring-2 hover:ring-red-500 transition"
            @click="setImage(img)"
          />
        </div>

        <div
          class="flex-1 flex items-center justify-center bg-white rounded-xl shadow-md"
        >
          <img
            :src="selectedImage || 'https://placehold.co/600x600?text=No+Image'"
            alt="product"
            class="w-full max-h-[600px] object-contain rounded-xl"
          />
        </div>
      </div>

      <div class="flex flex-col justify-between">
        <div class="space-y-4">
          <h1 class="text-4xl font-bold text-gray-900">{{ product.name }}</h1>

          <p class="text-red-600 font-semibold text-lg">
            ราคาเริ่มต้นเพียง ฿{{
              product.priceNew?.toLocaleString() || "0.00"
            }}
          </p>

          <div class="text-sm text-gray-700 leading-relaxed space-y-1">
            <p><strong>สี:</strong> {{ product.colors?.join(", ") || "-" }}</p>
            <p>
              <strong>ความจุ:</strong> {{ product.capacity?.join(", ") || "-" }}
            </p>
            <p>
              <strong>ประเภท:</strong>
              {{ product.condition === "new" ? "มือ1" : "มือ2" }}
            </p>
            <p><strong>แบรนด์:</strong> {{ product.brand }}</p>
            <p><strong>คงเหลือในสต็อก:</strong> {{ product.stock }} ชิ้น</p>
          </div>

          <div class="mt-6 flex items-center gap-4">
            <p class="font-semibold text-gray-700">จำนวน</p>
            <div
              class="flex items-center border rounded-lg overflow-hidden shadow-sm bg-white"
            >
              <button
                @click="decrease"
                class="px-3 py-2 text-gray-700 hover:bg-gray-200 transition"
              >
                -
              </button>
              <span
                class="px-5 py-2 text-gray-800 font-semibold bg-white min-w-[40px] text-center"
              >
                {{ quantity }}
              </span>
              <button
                @click="increase"
                class="px-3 py-2 text-gray-700 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          <p class="text-red-700 font-bold text-xl mt-2">
            ฿{{
              (
                (product.priceUsed || product.priceNew || 0) * quantity
              ).toLocaleString()
            }}
          </p>
        </div>

        <div class="flex flex-col gap-3 mt-8">
          <a
            href="https://www.toptechplaza.com/register"
            target="_blank"
            class="w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"
          >
            ลงทะเบียน
          </a>

          <button
            @click="goBack"
            class="w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 rounded-lg transition"
          >
            ← กลับหน้าก่อนหน้า
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto mt-12">
      <h2 class="text-xl font-bold text-red-800 mb-3">รายละเอียดสินค้า</h2>
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <h3 class="text-2xl font-semibold mb-2">{{ product.name }}</h3>
        <div class="text-gray-700 whitespace-pre-line leading-relaxed">
          {{ product.description || "ไม่มีรายละเอียดเพิ่มเติม" }}
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-10 text-gray-400">
    กำลังโหลดข้อมูลสินค้า...
  </div>
</template>
