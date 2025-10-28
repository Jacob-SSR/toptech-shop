<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import Swal from "sweetalert2";
import { Upload, X, ChevronDown, Loader2 } from "lucide-vue-next";

definePageMeta({ layout: "admin" });

const product = ref({
  name: "",
  description: "",
  sku: "",
  priceNew: 0,
  priceUsed: 0,
  brand: "",
  category: "",
  condition: "new",
  defects: "",
  percent: null as number | null,
  stock: 0,
  images: [] as string[],
  detailImages: [] as string[],
  colors: [] as string[],
  capacity: [] as string[],
});

const newColor = ref("");
const newCapacity = ref("");
const isUploading = ref(false);

const addColor = () => {
  const color = newColor.value.trim();
  if (color && !product.value.colors.includes(color)) {
    product.value.colors.push(color);
    newColor.value = "";
  }
};

const removeColor = (index: number) => {
  product.value.colors.splice(index, 1);
};

const addCapacity = () => {
  const cap = newCapacity.value.trim();
  if (cap && !product.value.capacity.includes(cap)) {
    product.value.capacity.push(cap);
    newCapacity.value = "";
  }
};

const removeCapacity = (index: number) => {
  product.value.capacity.splice(index, 1);
};

const uploadImages = async (e: Event, isDetail = false) => {
  const files = (e.target as HTMLInputElement).files;
  if (!files?.length) return;
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
  if (isDetail) product.value.detailImages.splice(index, 1);
  else product.value.images.splice(index, 1);
};

const resetForm = () => {
  product.value = {
    name: "",
    description: "",
    sku: "",
    priceNew: 0,
    priceUsed: 0,
    brand: "",
    category: "",
    condition: "new",
    defects: "",
    percent: null,
    stock: 0,
    images: [],
    detailImages: [],
    colors: [],
    capacity: [],
  };
  newColor.value = "";
  newCapacity.value = "";
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

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Price มือ 1*</label>
            <input
              v-model.number="product.priceNew"
              class="input"
              type="number"
            />
          </div>
          <div>
            <label class="label">Price มือ 2</label>
            <input
              v-model.number="product.priceUsed"
              class="input"
              type="number"
            />
          </div>
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
          <label class="label">สีสินค้า</label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="newColor"
              class="input flex-1"
              placeholder="เพิ่มสีใหม่..."
            />
            <button
              type="button"
              @click="addColor"
              class="px-3 py-2 bg-red-500 text-white rounded"
            >
              เพิ่ม
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(color, i) in product.colors"
              :key="i"
              class="bg-gray-200 px-2 py-1 rounded text-sm flex items-center"
            >
              {{ color }}
              <X
                class="ml-1 w-3 h-3 text-red-500 cursor-pointer"
                @click="removeColor(i)"
              />
            </span>
          </div>
        </div>

        <div>
          <label class="label">สเปก (RAM / ความจุ)</label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="newCapacity"
              class="input flex-1"
              placeholder="เช่น 8/256GB"
            />
            <button
              type="button"
              @click="addCapacity"
              class="px-3 py-2 bg-red-500 text-white rounded"
            >
              เพิ่ม
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(cap, i) in product.capacity"
              :key="i"
              class="bg-gray-200 px-2 py-1 rounded text-sm flex items-center"
            >
              {{ cap }}
              <X
                class="ml-1 w-3 h-3 text-red-500 cursor-pointer"
                @click="removeCapacity(i)"
              />
            </span>
          </div>
        </div>

        <div>
          <label class="label">Stock*</label>
          <input v-model.number="product.stock" class="input" type="number" />
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <label class="label">Product Images มือ 1 (Max 4)</label>
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
            <div
              v-for="(img, i) in product.images"
              :key="i"
              class="relative group"
            >
              <img :src="img" class="preview-img" />
              <button
                @click="removeImage(i, false)"
                class="remove-btn"
                title="ลบรูปนี้"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <label class="label">รายละเอียดเฉพาะมือ 2</label>
          <details class="detail-box group">
            <summary class="detail-summary flex items-center justify-between">
              <span>รายละเอียดเพิ่มเติม</span>
              <ChevronDown
                class="w-4 h-4 text-gray-600 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>

            <div class="mt-3 space-y-3">
              <div>
                <label class="label">Product Images มือ 2 (Max 4)</label>
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
                    v-for="(img, i) in product.detailImages"
                    :key="i"
                    class="relative group"
                  >
                    <img :src="img" class="preview-img" />
                    <button
                      @click="removeImage(i, true)"
                      class="remove-btn"
                      title="ลบรูปนี้"
                    >
                      <X class="w-4 h-4" />
                    </button>
                  </div>
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
      <button class="btn-primary" @click="saveProduct" :disabled="isUploading">
        SAVE
      </button>
      <button class="btn-secondary" @click="resetForm" :disabled="isUploading">
        CANCEL
      </button>
    </div>
  </div>
</template>
