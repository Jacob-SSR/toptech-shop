<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import type { Product } from "~/server/api/types/product";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const loading = ref(true);
const product = ref<Product | null>(null);

// โหลดข้อมูลสินค้า
const fetchProduct = async () => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    product.value = res.data.product;
  } catch (err) {
    console.error("Error fetching product:", err);
    Swal.fire("Error", "ไม่สามารถโหลดข้อมูลสินค้าได้", "error");
  } finally {
    loading.value = false;
  }
};

// อัปเดตสินค้า
const updateProduct = async () => {
  if (!product.value) return;

  try {
    await axios.put(`/api/products/${id}`, product.value);
    Swal.fire({
      icon: "success",
      title: "อัปเดตสินค้าเรียบร้อย",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/admin");
  } catch (err) {
    console.error("Error updating product:", err);
    Swal.fire("Error", "ไม่สามารถอัปเดตสินค้าได้", "error");
  }
};

onMounted(fetchProduct);
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Edit Product</h1>

    <div v-if="loading" class="text-center text-gray-500 py-10">
      กำลังโหลดข้อมูลสินค้า...
    </div>

    <form v-else @submit.prevent="updateProduct" class="space-y-4 max-w-2xl">
      <div>
        <label class="label">Product Name*</label>
        <input v-model="product!.name" class="input" type="text" />
      </div>

      <div>
        <label class="label">Description</label>
        <textarea v-model="product!.description" class="input"></textarea>
      </div>

      <div>
        <label class="label">Brand</label>
        <input v-model="product!.brand" class="input" />
      </div>

      <div>
        <label class="label">Category</label>
        <select v-model="product!.category" class="input">
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
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">Price*</label>
          <input v-model.number="product!.price" class="input" type="number" />
        </div>

        <div>
          <label class="label">Stock*</label>
          <input v-model.number="product!.stock" class="input" type="number" />
        </div>
      </div>

      <div>
        <label class="label">Condition</label>
        <select v-model="product!.condition" class="input">
          <option value="new">มือ 1</option>
          <option value="used">มือ 2</option>
        </select>
      </div>

      <div>
        <label class="label">Status</label>
        <select v-model="product!.status" class="input">
          <option value="active">แสดงผล</option>
          <option value="draft">ฉบับร่าง</option>
          <option value="inactive">ปิดการแสดงผล</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-primary">Update</button>
        <button
          type="button"
          class="btn-secondary"
          @click="router.push('/admin')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
