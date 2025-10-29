import { defineComponent, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    computed(() => route.params.brand);
    computed(() => route.params.id);
    const product = ref(null);
    const selectedImage = ref("");
    const quantity = ref(1);
    return (_ctx, _push, _parent, _attrs) => {
      if (product.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-10 px-6" }, _attrs))}><div class="max-w-6xl mx-auto grid md:grid-cols-[1fr_1fr] gap-10"><div class="flex gap-4"><div class="flex flex-col gap-3"><!--[-->`);
        ssrRenderList([
          ...product.value.images || [],
          ...product.value.detailImages || []
        ], (img, i) => {
          _push(`<img${ssrRenderAttr("src", img)} class="w-20 h-20 object-cover rounded-md border cursor-pointer hover:ring-2 hover:ring-red-500 transition">`);
        });
        _push(`<!--]--></div><div class="flex-1 flex items-center justify-center bg-white rounded-xl shadow-md"><img${ssrRenderAttr("src", selectedImage.value || "https://placehold.co/600x600?text=No+Image")} alt="product" class="w-full max-h-[600px] object-contain rounded-xl"></div></div><div class="flex flex-col justify-between"><div class="space-y-4"><h1 class="text-4xl font-bold text-gray-900">${ssrInterpolate(product.value.name)}</h1><p class="text-red-600 font-semibold text-lg"> ราคาเริ่มต้นเพียง ฿${ssrInterpolate(product.value.priceNew?.toLocaleString() || "0.00")}</p><div class="text-sm text-gray-700 leading-relaxed space-y-1"><p><strong>สี:</strong> ${ssrInterpolate(product.value.colors?.join(", ") || "-")}</p><p><strong>ความจุ:</strong> ${ssrInterpolate(product.value.capacity?.join(", ") || "-")}</p><p><strong>ประเภท:</strong> ${ssrInterpolate(product.value.condition === "new" ? "มือ1" : "มือ2")}</p><p><strong>แบรนด์:</strong> ${ssrInterpolate(product.value.brand)}</p><p><strong>คงเหลือในสต็อก:</strong> ${ssrInterpolate(product.value.stock)} ชิ้น</p></div><div class="mt-6 flex items-center gap-4"><p class="font-semibold text-gray-700">จำนวน</p><div class="flex items-center border rounded-lg overflow-hidden shadow-sm bg-white"><button class="px-3 py-2 text-gray-700 hover:bg-gray-200 transition"> - </button><span class="px-5 py-2 text-gray-800 font-semibold bg-white min-w-[40px] text-center">${ssrInterpolate(quantity.value)}</span><button class="px-3 py-2 text-gray-700 hover:bg-gray-200 transition"> + </button></div></div><p class="text-red-700 font-bold text-xl mt-2"> ฿${ssrInterpolate(((product.value.priceUsed || product.value.priceNew || 0) * quantity.value).toLocaleString())}</p></div><div class="flex flex-col gap-3 mt-8"><a href="https://www.toptechplaza.com/register" target="_blank" class="w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition"> ลงทะเบียน </a><button class="w-full text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 rounded-lg transition"> ← กลับหน้าก่อนหน้า </button></div></div></div><div class="max-w-5xl mx-auto mt-12"><h2 class="text-xl font-bold text-red-800 mb-3">รายละเอียดสินค้า</h2><div class="bg-white rounded-xl p-6 shadow-sm"><h3 class="text-2xl font-semibold mb-2">${ssrInterpolate(product.value.name)}</h3><div class="text-gray-700 whitespace-pre-line leading-relaxed">${ssrInterpolate(product.value.description || "ไม่มีรายละเอียดเพิ่มเติม")}</div></div></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center py-10 text-gray-400" }, _attrs))}> กำลังโหลดข้อมูลสินค้า... </div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[brand]/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-B_SEPdBj.mjs.map
