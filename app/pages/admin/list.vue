<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import type { Product } from "~/server/api/types/product";
import { Pencil, Trash2, PlusCircle, Loader2 } from "lucide-vue-next";

definePageMeta({
  layout: "admin",
});

const products = ref<Product[]>([]);
const loading = ref(true);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const res = await axios.get("/api/products");
    products.value = res.data.products || res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    Swal.fire("Error", "ไม่สามารถโหลดข้อมูลสินค้าได้", "error");
  } finally {
    loading.value = false;
  }
};

const deleteProduct = async (id: number) => {
  const confirm = await Swal.fire({
    title: "ลบสินค้า?",
    text: "ยืนยันการลบสินค้าออกจากระบบ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
  });

  if (!confirm.isConfirmed) return;

  try {
    await axios.delete(`/api/products/${id}`);
    Swal.fire("Deleted!", "ลบสินค้าเรียบร้อยแล้ว", "success");
    fetchProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
    Swal.fire("Error", "ไม่สามารถลบสินค้าได้", "error");
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="page-container">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <h1 class="page-title">Product List</h1>

      <NuxtLink
        to="/admin/add"
        class="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full sm:w-auto justify-center"
      >
        <PlusCircle class="w-5 h-5" />
        Add Product
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="flex justify-center items-center py-10 text-gray-500"
    >
      <Loader2 class="w-6 h-6 animate-spin mr-2" />
      กำลังโหลดข้อมูล...
    </div>

    <!-- Product Table (Desktop) -->
    <div v-else class="hidden lg:block overflow-x-auto">
      <table class="admin-table w-full min-w-[800px]">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Condition</th>
            <th>Stock</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="p in products"
            :key="p.id"
            class="hover:bg-gray-50 transition"
          >
            <td>{{ p.id }}</td>
            <td>
              <img
                :src="p.images?.[0] || '/no-image.png'"
                alt="product image"
                class="w-12 h-12 object-cover rounded-md border"
              />
            </td>
            <td>{{ p.name }}</td>
            <td class="capitalize">{{ p.category }}</td>
            <td>฿{{ p.price.toLocaleString() }}</td>
            <td>{{ p.brand }}</td>
            <td>{{ p.condition === "new" ? "มือ 1" : "มือ 2" }}</td>
            <td>{{ p.stock }}</td>
            <td>
              <span
                :class="{
                  'text-green-600 font-medium': p.status === 'active',
                  'text-yellow-600 font-medium': p.status === 'draft',
                  'text-gray-500 font-medium': p.status === 'inactive',
                }"
              >
                {{
                  p.status === "active"
                    ? "แสดงผล"
                    : p.status === "draft"
                    ? "ฉบับร่าง"
                    : "ปิดการแสดงผล"
                }}
              </span>
            </td>
            <td class="flex justify-center gap-3">
              <NuxtLink
                :to="`/admin/edit/${p.id}`"
                class="text-blue-500 hover:text-blue-700 flex items-center"
                title="Edit"
              >
                <Pencil class="w-5 h-5" />
              </NuxtLink>

              <button
                @click="deleteProduct(p.id)"
                class="text-red-500 hover:text-red-700 flex items-center"
                title="Delete"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </td>
          </tr>

          <tr v-if="!products.length && !loading">
            <td colspan="10" class="text-center text-gray-500 py-6">
              ไม่มีสินค้าที่จะแสดง
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Product Card (Mobile) -->
    <div
      v-if="!loading"
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden"
    >
      <div
        v-for="p in products"
        :key="p.id"
        class="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
      >
        <div class="flex items-center gap-4">
          <img
            :src="p.images?.[0] || '/no-image.png'"
            class="w-16 h-16 object-cover rounded-md border"
          />
          <div>
            <h2 class="font-semibold text-gray-800 text-sm">
              {{ p.name }}
            </h2>
            <p class="text-xs text-gray-500">{{ p.brand }}</p>
          </div>
        </div>

        <div class="mt-3 text-sm space-y-1">
          <p>
            <span class="font-medium">ราคา:</span> ฿{{
              p.price.toLocaleString()
            }}
          </p>
          <p><span class="font-medium">หมวดหมู่:</span> {{ p.category }}</p>
          <p>
            <span class="font-medium">สภาพ:</span>
            {{ p.condition === "new" ? "มือ 1" : "มือ 2" }}
          </p>
          <p><span class="font-medium">สต็อก:</span> {{ p.stock }}</p>
          <p>
            <span class="font-medium">สถานะ:</span>
            <span
              :class="{
                'text-green-600 font-medium': p.status === 'active',
                'text-yellow-600 font-medium': p.status === 'draft',
                'text-gray-500 font-medium': p.status === 'inactive',
              }"
            >
              {{
                p.status === "active"
                  ? "แสดงผล"
                  : p.status === "draft"
                  ? "ฉบับร่าง"
                  : "ปิดการแสดงผล"
              }}
            </span>
          </p>
        </div>

        <div class="mt-3 flex justify-end gap-3">
          <NuxtLink
            :to="`/admin/edit/${p.id}`"
            class="text-blue-500 hover:text-blue-700"
          >
            <Pencil class="w-4 h-4" />
          </NuxtLink>
          <button
            @click="deleteProduct(p.id)"
            class="text-red-500 hover:text-red-700"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>