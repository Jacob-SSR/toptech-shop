<script setup lang="ts">
import axios from "axios";
import { ref, computed, onMounted, watchEffect } from "vue";
import Swal from "sweetalert2";
import { Pencil, Trash2, Loader2, Search } from "lucide-vue-next";
import type { Product } from "../../../server/api/types/product";

definePageMeta({ layout: "admin" });

const products = ref<Product[]>([]);
const loading = ref(true);
const isMounted = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedStatus = ref("all");

const fetchProducts = async () => {
  try {
    loading.value = true;
    const res = await axios.get<{ products: Product[] }>("/api/products");
    products.value = res.data.products || res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    Swal.fire("Error", "ไม่สามารถโหลดข้อมูลสินค้าได้", "error");
  } finally {
    loading.value = false;
  }
};

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchCategory =
      selectedCategory.value === "all" || p.category === selectedCategory.value;

    const matchStatus =
      selectedStatus.value === "all" || p.status === selectedStatus.value;

    return matchSearch && matchCategory && matchStatus;
  });
});

const toggleStatus = async (p: Product) => {
  const newStatus: Product["status"] =
    p.status === "active"
      ? "inactive"
      : p.status === "inactive"
      ? "draft"
      : "active";

  try {
    await axios.put(`/api/products/${p.id}`, { status: newStatus });
    p.status = newStatus;
    Swal.fire({
      toast: true,
      icon: "success",
      title: "อัปเดตสถานะสำเร็จ",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire("Error", "อัปเดตสถานะไม่สำเร็จ", "error");
  }
};

const deleteProduct = async (id: number) => {
  const confirm = await Swal.fire({
    title: "ลบสินค้า?",
    text: "คุณต้องการลบสินค้านี้หรือไม่?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "ลบ",
    cancelButtonText: "ยกเลิก",
  });

  if (!confirm.isConfirmed) return;

  try {
    await axios.delete(`/api/products/${id}`);
    products.value = products.value.filter((p) => p.id !== id);
    Swal.fire("Deleted!", "ลบสินค้าเรียบร้อยแล้ว", "success");
  } catch (err) {
    Swal.fire("Error", "ไม่สามารถลบสินค้าได้", "error");
  }
};

onMounted(() => {
  const user = useSupabaseUser();

  watchEffect(() => {
    if (user.value === null) return;
    if (!user.value) {
      navigateTo("/admin/login");
      return;
    }

    isMounted.value = true;
    fetchProducts();
  });
});
</script>

<template>
  <ClientOnly>
    <div v-if="isMounted" class="page-container">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <h1 class="page-title">Product List</h1>

        <div class="flex flex-wrap items-center gap-3">
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาสินค้า"
              class="pl-9 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <select
            v-model="selectedCategory"
            class="border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="all">ทุกหมวดหมู่</option>
            <option value="smartphone">Smartphone</option>
            <option value="tablet">Tablet</option>
            <option value="notebook">Notebook</option>
            <option value="monitor">Monitor</option>
            <option value="earpods">Earpods</option>
            <option value="desktop">Desktop</option>
            <option value="gadget">Gadget</option>
            <option value="accessories">Accessories</option>
            <option value="console">Console</option>
          </select>

          <select
            v-model="selectedStatus"
            class="border rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="active">แสดงผล</option>
            <option value="inactive">ปิดการแสดงผล</option>
            <option value="draft">ฉบับร่าง</option>
          </select>

          <NuxtLink
            to="/admin/add"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Add Product
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="loading"
        class="flex justify-center items-center py-10 text-gray-500"
      >
        <Loader2 class="w-6 h-6 animate-spin mr-2" />
        กำลังโหลดข้อมูล...
      </div>

      <div
        v-else
        class="overflow-x-auto shadow-sm border border-gray-200 rounded-lg"
      >
        <table class="admin-table w-full text-sm">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="w-15 text-center">ID</th>
              <th class="w-20 text-center">Image</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Spec</th>
              <th>Price (มือ1 / มือ2)</th>
              <th>Condition</th>
              <th>Stock</th>
              <th>Status</th>
              <th class="text-center w-24">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="p in filteredProducts"
              :key="p.id"
              class="hover:bg-gray-50 transition border-b"
            >
              <td class="text-center">{{ p.id }}</td>

              <td class="p-2 text-center">
                <img
                  :src="
                    p.images?.[0] ||
                    p.detailImages?.[0] ||
                    'https://placehold.co/80x80?text=No+Image'
                  "
                  class="w-12 h-12 rounded-md border object-cover mx-auto"
                  alt="Product Image"
                />
              </td>

              <td class="font-medium text-gray-800">{{ p.name }}</td>
              <td class="text-gray-600">{{ p.sku }}</td>
              <td class="capitalize">{{ p.category }}</td>
              <td>{{ p.brand }}</td>

              <td>
                <span v-if="p.colors?.length" class="text-xs text-gray-600">
                  {{ Array.isArray(p.colors) ? p.colors.join(", ") : p.colors }}
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>

              <td>
                <span v-if="p.capacity?.length" class="text-xs text-gray-600">
                  {{
                    Array.isArray(p.capacity)
                      ? p.capacity.join(", ")
                      : p.capacity
                  }}
                </span>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>

              <td class="font-semibold text-gray-700">
                <div class="flex flex-col text-center leading-tight">
                  <span v-if="p.priceNew"
                    >มือ1 ฿{{ p.priceNew.toLocaleString() }}</span
                  >
                  <span v-if="p.priceUsed" class="text-gray-500 text-xs">
                    มือ2 ฿{{ p.priceUsed.toLocaleString() }}
                  </span>
                </div>
              </td>

              <td>{{ p.condition === "new" ? "มือ 1" : "มือ 2" }}</td>
              <td class="text-center">{{ p.stock }}</td>

              <td class="text-center">
                <div class="flex flex-col items-center gap-1">
                  <span
                    class="text-xs font-medium"
                    :class="{
                      'text-green-600': p.status === 'active',
                      'text-gray-500': p.status === 'inactive',
                      'text-yellow-600': p.status === 'draft',
                    }"
                  >
                    {{
                      p.status === "active"
                        ? "แสดงผล"
                        : p.status === "inactive"
                        ? "ปิดการแสดงผล"
                        : "ฉบับร่าง"
                    }}
                  </span>
                  <button
                    @click="toggleStatus(p)"
                    class="relative w-12 h-6 flex items-center rounded-full transition-all duration-300"
                    :class="{
                      'bg-green-500': p.status === 'active',
                      'bg-gray-400': p.status === 'inactive',
                      'bg-yellow-400': p.status === 'draft',
                    }"
                  >
                    <span
                      class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300"
                      :class="{
                        'translate-x-6': p.status === 'active',
                        'translate-x-3': p.status === 'draft',
                        'translate-x-0': p.status === 'inactive',
                      }"
                    ></span>
                  </button>
                </div>
              </td>

              <td class="text-center align-middle">
                <div class="flex justify-center items-center gap-3">
                  <NuxtLink
                    :to="`/admin/edit/${p.id}`"
                    class="text-blue-500 hover:text-blue-700 transition"
                    title="แก้ไข"
                  >
                    <Pencil class="w-5 h-5" />
                  </NuxtLink>
                  <button
                    @click="deleteProduct(p.id)"
                    class="text-red-500 hover:text-red-700 transition"
                    title="ลบสินค้า"
                  >
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!filteredProducts.length">
              <td colspan="13" class="text-center text-gray-500 py-6">
                ไม่พบสินค้าที่ตรงกับเงื่อนไข
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template #fallback>
      <div class="flex justify-center items-center h-screen">
        <Loader2 class="w-6 h-6 animate-spin" />
      </div>
    </template>
  </ClientOnly>
</template>
