<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";

definePageMeta({
  layout: "admin",
});

const product = ref({
  name: "",
  description: "",
  sku: "",
  price: 0,
  brand: "",
  category: "",
  condition: "new",
  defects: "",
  percent: null,
  stock: 0,
  images: [] as string[],
  detailImages: [] as string[],
});

const uploadImages = async (e: Event, isDetail = false) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) return;
  const uploaded: string[] = [];

  for (const file of Array.from(files)) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    uploaded.push(res.data.url);
  }

  if (isDetail) product.value.detailImages.push(...uploaded);
  else product.value.images.push(...uploaded);
};

const resetForm = () => {
  product.value = {
    name: "",
    description: "",
    sku: "",
    price: 0,
    brand: "",
    category: "",
    condition: "new",
    defects: "",
    percent: null,
    stock: 0,
    images: [],
    detailImages: [],
  };
};

const saveProduct = async () => {
  try {
    await axios.post("/api/products", product.value);
    Swal.fire({
      icon: "success",
      title: "เพิ่มสินค้าเรียบร้อย",
      timer: 2000,
      showConfirmButton: false,
    });
    resetForm();
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "ไม่สามารถบันทึกข้อมูลได้", "error");
  }
};
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Add Product</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Form -->
      <div class="space-y-4">
        <div>
          <label class="label">Product Name*</label>
          <input v-model="product.name" class="input" type="text" />
        </div>

        <div>
          <label class="label">Description</label>
          <textarea v-model="product.description" class="input"></textarea>
        </div>

        <div>
          <label class="label">SKU*</label>
          <input v-model="product.sku" class="input" type="text" />
        </div>

        <div>
          <label class="label">Price*</label>
          <input v-model.number="product.price" class="input" type="number" />
        </div>

        <div>
          <label class="label">Brand*</label>
          <input v-model="product.brand" class="input" type="text" />
        </div>

        <div>
          <label class="label">Category*</label>
          <select v-model="product.category" class="input">
            <option disabled value="">-- เลือกหมวดหมู่ --</option>
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

        <div>
          <label class="label">สภาพสินค้า*</label>
          <select v-model="product.condition" class="input">
            <option value="new">มือ 1</option>
            <option value="used">มือ 2</option>
          </select>
        </div>

        <div>
          <label class="label">Stock*</label>
          <input v-model.number="product.stock" class="input" type="number" />
        </div>
      </div>

      <!-- Right Side -->
      <div class="space-y-6">
        <div>
          <label class="label">Product Images มือ 1 (Max 4)</label>
          <input type="file" multiple @change="(e) => uploadImages(e, false)" />
          <div class="preview-grid">
            <img
              v-for="(img, i) in product.images"
              :key="i"
              :src="img"
              class="preview-img"
            />
          </div>
        </div>

        <div>
          <label class="label">รายละเอียดเฉพาะมือ 2</label>
          <details class="detail-box">
            <summary class="detail-summary">รายละเอียดเพิ่มเติม</summary>

            <div class="mt-3 space-y-3">
              <div>
                <label class="label">Product Images มือ 2 (Max 4)</label>
                <input
                  type="file"
                  multiple
                  @change="(e) => uploadImages(e, true)"
                />
                <div class="preview-grid">
                  <img
                    v-for="(img, i) in product.detailImages"
                    :key="i"
                    :src="img"
                    class="preview-img"
                  />
                </div>
              </div>

              <div>
                <label class="label">คุณภาพสินค้า (%)</label>
                <input v-model="product.percent" class="input" type="number" />
              </div>

              <div>
                <label class="label">รายละเอียดของตำหนิ (ถ้ามี)</label>
                <textarea v-model="product.defects" class="input"></textarea>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-primary" @click="saveProduct">SAVE</button>
      <button class="btn-secondary" @click="resetForm">CANCEL</button>
    </div>
  </div>
</template>
