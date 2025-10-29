import { defineComponent, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { P as ProductCard } from './ProductCard-CoFUpE7U.mjs';
import './nuxt-link-DBPf8xAO.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[category]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    computed(() => route.params.category);
    const products = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen py-10 px-6" }, _attrs))}><div class="max-w-7xl mx-auto">`);
      if (loading.value) {
        _push(`<div class="text-center text-gray-500 py-10"> กำลังโหลดข้อมูล... </div>`);
      } else if (!products.value.length) {
        _push(`<div class="text-center text-gray-500 py-10 text-lg"> ไม่มีสินค้าสำหรับหมวดหมู่นี้ </div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(8, (n) => {
          _push(`<div class="bg-white rounded-xl shadow animate-pulse p-4 flex flex-col gap-3"><div class="w-full h-44 bg-gray-200 rounded-md"></div><div class="h-4 w-3/4 bg-gray-200 rounded"></div><div class="h-3 w-1/2 bg-gray-200 rounded"></div><div class="h-5 w-1/3 bg-gray-200 rounded"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(products.value, (p) => {
          _push(ssrRenderComponent(ProductCard, {
            key: p.id,
            product: p
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/category/[category].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_category_-B-E7VQHq.mjs.map
