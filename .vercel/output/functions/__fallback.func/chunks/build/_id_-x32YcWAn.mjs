import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'file://D:/workshop/FullStack/toptech_shop/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'file://D:/workshop/FullStack/toptech_shop/node_modules/vue/server-renderer/index.mjs';
import { useRoute, useRouter } from 'file://D:/workshop/FullStack/toptech_shop/node_modules/vue-router/vue-router.node.mjs';
import { X, Loader2, Upload, ChevronDown } from 'file://D:/workshop/FullStack/toptech_shop/node_modules/lucide-vue-next/dist/cjs/lucide-vue-next.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    route.params.id;
    const loading = ref(true);
    const isUploading = ref(false);
    const product = ref(null);
    const newColor = ref("");
    const newCapacity = ref("");
    const removeColor = (index) => {
      product.value.colors.splice(index, 1);
    };
    const removeCapacity = (index) => {
      product.value.capacity.splice(index, 1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-container" }, _attrs))}><h1 class="page-title">Edit Product</h1>`);
      if (loading.value) {
        _push(`<div class="text-center text-gray-500 py-10"> กำลังโหลดข้อมูลสินค้า... </div>`);
      } else {
        _push(`<form class="space-y-4 max-w-2xl"><div><label class="label">ชื่อสินค้า</label><input${ssrRenderAttr("value", product.value.name)} class="input" type="text"></div><div><label class="label">คำอธิบายสินค้า</label><textarea class="input">${ssrInterpolate(product.value.description)}</textarea></div><div class="grid grid-cols-2 gap-4"><div><label class="label">แบรนด์</label><input${ssrRenderAttr("value", product.value.brand)} class="input"></div><div><label class="label">SKU</label><input${ssrRenderAttr("value", product.value.sku)} class="input"></div></div><div><label class="label">หมวดหมู่</label><select class="input"><option value="smartphone"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "smartphone") : ssrLooseEqual(product.value.category, "smartphone")) ? " selected" : ""}>Smartphone</option><option value="tablet"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "tablet") : ssrLooseEqual(product.value.category, "tablet")) ? " selected" : ""}>Tablet</option><option value="notebook"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "notebook") : ssrLooseEqual(product.value.category, "notebook")) ? " selected" : ""}>Notebook</option><option value="monitor"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "monitor") : ssrLooseEqual(product.value.category, "monitor")) ? " selected" : ""}>Monitor</option><option value="earpods"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "earpods") : ssrLooseEqual(product.value.category, "earpods")) ? " selected" : ""}>Earpods</option><option value="desktop"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "desktop") : ssrLooseEqual(product.value.category, "desktop")) ? " selected" : ""}>Desktop</option><option value="gadget"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "gadget") : ssrLooseEqual(product.value.category, "gadget")) ? " selected" : ""}>Gadget</option><option value="accessories"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "accessories") : ssrLooseEqual(product.value.category, "accessories")) ? " selected" : ""}>Accessories</option><option value="console"${ssrIncludeBooleanAttr(Array.isArray(product.value.category) ? ssrLooseContain(product.value.category, "console") : ssrLooseEqual(product.value.category, "console")) ? " selected" : ""}>Console</option></select></div><div class="grid grid-cols-2 gap-4"><div><label class="label">ราคามือ 1</label><input${ssrRenderAttr("value", product.value.priceNew)} class="input" type="number"></div><div><label class="label">ราคามือ 2</label><input${ssrRenderAttr("value", product.value.priceUsed)} class="input" type="number" placeholder="ใส่เฉพาะถ้ามี"></div></div><div><label class="label">สีสินค้า</label><div class="flex gap-2 mb-2"><input${ssrRenderAttr("value", newColor.value)} class="input flex-1" placeholder="เพิ่มสีใหม่..."><button type="button" class="px-3 py-2 bg-red-500 text-white rounded"> เพิ่ม </button></div><div class="flex flex-wrap gap-2"><!--[-->`);
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
        _push(`<!--]--></div></div><div class="grid grid-cols-2 gap-4"><div><label class="label">Stock</label><input${ssrRenderAttr("value", product.value.stock)} class="input" type="number"></div><div><label class="label">Condition</label><select class="input"><option value="new"${ssrIncludeBooleanAttr(Array.isArray(product.value.condition) ? ssrLooseContain(product.value.condition, "new") : ssrLooseEqual(product.value.condition, "new")) ? " selected" : ""}>มือ 1</option><option value="used"${ssrIncludeBooleanAttr(Array.isArray(product.value.condition) ? ssrLooseContain(product.value.condition, "used") : ssrLooseEqual(product.value.condition, "used")) ? " selected" : ""}>มือ 2</option></select></div></div><div><label class="label">รูปสินค้ามือ 1</label><div class="upload-box"><label class="${ssrRenderClass([{ "opacity-60 cursor-not-allowed": isUploading.value }, "upload-btn"])}"><input type="file" multiple class="hidden"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""}>`);
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
          _push(`<div class="relative"><img${ssrRenderAttr("src", img)} class="preview-img"><button class="remove-btn">`);
          _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--></div></div><details class="detail-box group"><summary class="detail-summary flex items-center justify-between cursor-pointer"><span>รายละเอียดเพิ่มเติมของมือ 2</span>`);
        _push(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4 text-gray-600 transition-transform duration-300 group-open:rotate-180" }, null, _parent));
        _push(`</summary><div class="mt-3 space-y-3"><div><label class="label">รูปสินค้ามือ 2</label><div class="upload-box"><label class="${ssrRenderClass([{ "opacity-60 cursor-not-allowed": isUploading.value }, "upload-btn"])}"><input type="file" multiple class="hidden"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""}>`);
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
          _push(`<div class="relative"><img${ssrRenderAttr("src", img)} class="preview-img"><button class="remove-btn">`);
          _push(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent));
          _push(`</button></div>`);
        });
        _push(`<!--]--></div></div><div><label class="label">คุณภาพสินค้า (%)</label><input${ssrRenderAttr("value", product.value.percent)} class="input" type="number"></div><div><label class="label">รายละเอียดตำหนิ</label><textarea class="input">${ssrInterpolate(product.value.defects)}</textarea></div></div></details><div class="form-actions"><button type="submit" class="btn-primary">Update</button><button type="button" class="btn-secondary"> Cancel </button></div></form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-x32YcWAn.mjs.map
