import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { X, Loader2, Upload, ChevronDown } from 'lucide-vue-next';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "add",
  __ssrInlineRender: true,
  setup(__props) {
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
      percent: null,
      stock: 0,
      images: [],
      detailImages: [],
      colors: [],
      capacity: []
    });
    const newColor = ref("");
    const newCapacity = ref("");
    const isUploading = ref(false);
    const removeColor = (index) => {
      product.value.colors.splice(index, 1);
    };
    const removeCapacity = (index) => {
      product.value.capacity.splice(index, 1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}><h1 class="page-title">Add Product</h1><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><div><label class="label">Product Name*</label><input${ssrRenderAttr("value", product.value.name)} class="input" type="text"></div><div><label class="label">Description</label><textarea class="input">${ssrInterpolate(product.value.description)}</textarea></div><div><label class="label">SKU*</label><input${ssrRenderAttr("value", product.value.sku)} class="input" type="text"></div><div class="grid grid-cols-2 gap-3"><div><label class="label">Price มือ 1*</label><input${ssrRenderAttr("value", product.value.priceNew)} class="input" type="number"></div><div><label class="label">Price มือ 2</label><input${ssrRenderAttr("value", product.value.priceUsed)} class="input" type="number"></div></div><div><label class="label">Brand*</label><input${ssrRenderAttr("value", product.value.brand)} class="input" type="text"></div><div><label class="label">Category*</label><select class="input"><option disabled value=""${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "") : ssrLooseEqual(product.value.category, "")) ? " selected" : ""}>-- เลือกหมวดหมู่ --</option><option value="smartphone"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "smartphone") : ssrLooseEqual(product.value.category, "smartphone")) ? " selected" : ""}>Smartphone</option><option value="tablet"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "tablet") : ssrLooseEqual(product.value.category, "tablet")) ? " selected" : ""}>Tablet</option><option value="notebook"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "notebook") : ssrLooseEqual(product.value.category, "notebook")) ? " selected" : ""}>Notebook</option><option value="monitor"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "monitor") : ssrLooseEqual(product.value.category, "monitor")) ? " selected" : ""}>Monitor</option><option value="earpods"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "earpods") : ssrLooseEqual(product.value.category, "earpods")) ? " selected" : ""}>Earpods</option><option value="desktop"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "desktop") : ssrLooseEqual(product.value.category, "desktop")) ? " selected" : ""}>Desktop</option><option value="gadget"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "gadget") : ssrLooseEqual(product.value.category, "gadget")) ? " selected" : ""}>Gadget</option><option value="accessories"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "accessories") : ssrLooseEqual(product.value.category, "accessories")) ? " selected" : ""}>Accessories</option><option value="console"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "console") : ssrLooseEqual(product.value.category, "console")) ? " selected" : ""}>Console</option></select></div><div><label class="label">สีสินค้า</label><div class="flex gap-2 mb-2"><input${ssrRenderAttr("value", newColor.value)} class="input flex-1" placeholder="เพิ่มสีใหม่..."><button type="button" class="px-3 py-2 bg-red-500 text-white rounded"> เพิ่ม </button></div><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(product.value.colors, (color, i) => {
        _push(`<span class="bg-gray-200 px-2 py-1 rounded text-sm flex items-center">${ssrInterpolate(color)} `);
        _push(ssrRenderComponent(unref(X), {
          class: "ml-1 w-3 h-3 text-red-500 cursor-pointer",
          onClick: ($event) => removeColor(i)
        }, null, _parent));
        _push(`</span>`);
      });
      _push(`<!--]--></div></div><div><label class="label">สเปก (RAM / ความจุ)</label><div class="flex gap-2 mb-2"><input${ssrRenderAttr("value", newCapacity.value)} class="input flex-1" placeholder="เช่น 8/256GB"><button type="button" class="px-3 py-2 bg-red-500 text-white rounded"> เพิ่ม </button></div><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(product.value.capacity, (cap, i) => {
        _push(`<span class="bg-gray-200 px-2 py-1 rounded text-sm flex items-center">${ssrInterpolate(cap)} `);
        _push(ssrRenderComponent(unref(X), {
          class: "ml-1 w-3 h-3 text-red-500 cursor-pointer",
          onClick: ($event) => removeCapacity(i)
        }, null, _parent));
        _push(`</span>`);
      });
      _push(`<!--]--></div></div><div><label class="label">Stock*</label><input${ssrRenderAttr("value", product.value.stock)} class="input" type="number"></div></div><div class="space-y-6"><div><label class="label">Product Images มือ 1 (Max 4)</label><div class="upload-box"><label class="${ssrRenderClass([{ "opacity-60 cursor-not-allowed": isUploading.value }, "upload-btn"])}"><input type="file" multiple class="hidden"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""}>`);
      if (isUploading.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Loader2), { class: "icon animate-spin" }, null, _parent));
        _push(`<span>Uploading...</span><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Upload), { class: "icon" }, null, _parent));
        _push(`<span>Upload Images</span><!--]-->`);
      }
      _push(`</label></div><div class="preview-grid"><!--[-->`);
      ssrRenderList(product.value.images, (img, i) => {
        _push(`<div class="relative group"><img${ssrRenderAttr("src", img)} class="preview-img"><button class="remove-btn" title="ลบรูปนี้">`);
        _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div><div><label class="label">รายละเอียดเฉพาะมือ 2</label><details class="detail-box group"><summary class="detail-summary flex items-center justify-between"><span>รายละเอียดเพิ่มเติม</span>`);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4 text-gray-600 transition-transform duration-300 group-open:rotate-180" }, null, _parent));
      _push(`</summary><div class="mt-3 space-y-3"><div><label class="label">Product Images มือ 2 (Max 4)</label><div class="upload-box"><label class="${ssrRenderClass([{ "opacity-60 cursor-not-allowed": isUploading.value }, "upload-btn"])}"><input type="file" multiple class="hidden"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""}>`);
      if (isUploading.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Loader2), { class: "icon animate-spin" }, null, _parent));
        _push(`<span>Uploading...</span><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Upload), { class: "icon" }, null, _parent));
        _push(`<span>Upload Images</span><!--]-->`);
      }
      _push(`</label></div><div class="preview-grid"><!--[-->`);
      ssrRenderList(product.value.detailImages, (img, i) => {
        _push(`<div class="relative group"><img${ssrRenderAttr("src", img)} class="preview-img"><button class="remove-btn" title="ลบรูปนี้">`);
        _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
        _push(`</button></div>`);
      });
      _push(`<!--]--></div></div><div><label class="label">คุณภาพสินค้า (%)</label><input${ssrRenderAttr("value", product.value.percent)} class="input" type="number"></div><div><label class="label">รายละเอียดของตำหนิ (ถ้ามี)</label><textarea class="input">${ssrInterpolate(product.value.defects)}</textarea></div></div></details></div></div></div><div class="form-actions"><button class="btn-primary"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""}> SAVE </button><button class="btn-secondary"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""}> CANCEL </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/add.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=add-BOjU8jsR.mjs.map
