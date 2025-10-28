<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Upload, X, Loader2, ChevronDown } from "lucide-vue-next";
import type { Product } from "../../../../server/api/types/product";

definePageMeta({ layout: "admin" });

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const loading = ref(true);
const isUploading = ref(false);
const product = ref<Product | null>(null);

const toStringArray = (v: any) => {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.trim()) {
    try {
      return JSON.parse(v);
    } catch {
      return [v];
    }
  }
  return [];
};

const fetchProduct = async () => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    product.value = res.data.product;
    product.value.images = toStringArray(product.value.images);
    product.value.detailImages = toStringArray(product.value.detailImages);
  } catch (err) {
    console.error("Error fetching product:", err);
    Swal.fire("Error", "ไม่สามารถโหลดข้อมูลสินค้าได้", "error");
  } finally {
    loading.value = false;
  }
};

const uploadImages = async (e: Event, isDetail = false) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) return;
  if (!product.value) return;

  const uploaded: string[] = [];
  isUploading.value = true;

  try {
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
  } catch (err) {
    console.error("Upload error:", err);
    Swal.fire("Error", "อัปโหลดรูปไม่สำเร็จ", "error");
  } finally {
    isUploading.value = false;
  }
};

const removeImage = (index: number, isDetail = false) => {
  if (!product.value) return;
  if (isDetail) product.value.detailImages.splice(index, 1);
  else product.value.images.splice(index, 1);
};

const updateProduct = async () => {
  if (!product.value) return;

  try {
    await axios.put(`/api/products/${id}`, {
      ...product.value,
      priceNew: Number(product.value.priceNew) || 0,
      priceUsed:
        product.value.priceUsed !== undefined &&
        product.value.priceUsed !== null
          ? Number(product.value.priceUsed)
          : null,
      percent: product.value.percent ? Number(product.value.percent) : null,
      stock: Number(product.value.stock) || 0,
    });

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
      <!-- Product Info -->
      <div>
        <label class="label">ชื่อสินค้า</label>
        <input v-model="product!.name" class="input" type="text" />
      </div>

      <div>
        <label class="label">คำอธิบายสินค้า</label>
        <textarea v-model="product!.description" class="input"></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">แบรนด์</label>
          <input v-model="product!.brand" class="input" />
        </div>
        <div>
          <label class="label">SKU</label>
          <input v-model="product!.sku" class="input" />
        </div>
      </div>

      <div>
        <label class="label">หมวดหมู่</label>
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
          <label class="label">ราคามือ 1</label>
          <input
            v-model.number="product!.priceNew"
            class="input"
            type="number"
          />
        </div>
        <div>
          <label class="label">ราคามือ 2</label>
          <input
            v-model.number="product!.priceUsed"
            class="input"
            type="number"
            placeholder="ใส่เฉพาะถ้ามี"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">Stock</label>
          <input v-model.number="product!.stock" class="input" type="number" />
        </div>
        <div>
          <label class="label">Condition</label>
          <select v-model="product!.condition" class="input">
            <option value="new">มือ 1</option>
            <option value="used">มือ 2</option>
          </select>
        </div>
      </div>

      <div>
        <label class="label">รูปสินค้ามือ 1</label>
        <div class="upload-box">
          <label
            class="upload-btn"
            :class="{ 'opacity-60 cursor-not-allowed': isUploading }"
          >
            <input
              type="file"
              multiple
              class="hidden"
              @change="(e) => uploadImages(e, false)"
              :disabled="isUploading"
            />
            <template v-if="isUploading">
              <Loader2 class="icon animate-spin" />
              <span>Uploading...</span>
            </template>
            <template v-else>
              <Upload class="icon" />
              <span>Upload Images</span>
            </template>
          </label>
        </div>

        <div class="preview-grid">
          <div v-for="(img, i) in product!.images" :key="i" class="relative">
            <img :src="img" class="preview-img" />
            <button @click="removeImage(i, false)" class="remove-btn">
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <details class="detail-box group">
        <summary
          class="detail-summary flex items-center justify-between cursor-pointer"
        >
          <span>รายละเอียดเพิ่มเติมของมือ 2</span>
          <ChevronDown
            class="w-4 h-4 text-gray-600 transition-transform duration-300 group-open:rotate-180"
          />
        </summary>

        <div class="mt-3 space-y-3">
          <div>
            <label class="label">รูปสินค้ามือ 2</label>
            <div class="upload-box">
              <label
                class="upload-btn"
                :class="{ 'opacity-60 cursor-not-allowed': isUploading }"
              >
                <input
                  type="file"
                  multiple
                  class="hidden"
                  @change="(e) => uploadImages(e, true)"
                  :disabled="isUploading"
                />
                <template v-if="isUploading">
                  <Loader2 class="icon animate-spin" />
                  <span>Uploading...</span>
                </template>
                <template v-else>
                  <Upload class="icon" />
                  <span>Upload Images</span>
                </template>
              </label>
            </div>

            <div class="preview-grid">
              <div
                v-for="(img, i) in product!.detailImages"
                :key="i"
                class="relative"
              >
                <img :src="img" class="preview-img" />
                <button @click="removeImage(i, true)" class="remove-btn">
                  <X class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <label class="label">คุณภาพสินค้า (%)</label>
            <input
              v-model.number="product!.percent"
              class="input"
              type="number"
            />
          </div>

          <div>
            <label class="label">รายละเอียดตำหนิ</label>
            <textarea v-model="product!.defects" class="input"></textarea>
          </div>
        </div>
      </details>

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


