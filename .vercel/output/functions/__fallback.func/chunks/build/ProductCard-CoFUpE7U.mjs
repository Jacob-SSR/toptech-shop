import { _ as __nuxt_component_0 } from './nuxt-link-DBPf8xAO.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center overflow-hidden" }, _attrs))} data-v-167233dc>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/product/${__props.product.brand.toLowerCase()}/${__props.product.id}`,
        class: "block w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr(
              "src",
              __props.product.images?.[0] || __props.product.detailImages?.[0] || "https://placehold.co/400x400?text=No+Image"
            )}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-56 object-contain bg-white hover:scale-105 transition-transform duration-300" data-v-167233dc${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.product.images?.[0] || __props.product.detailImages?.[0] || "https://placehold.co/400x400?text=No+Image",
                alt: __props.product.name,
                class: "w-full h-56 object-contain bg-white hover:scale-105 transition-transform duration-300"
              }, null, 8, ["src", "alt"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="p-4 text-center flex flex-col flex-grow" data-v-167233dc><h2 class="text-base font-semibold text-gray-900 line-clamp-1" data-v-167233dc>${ssrInterpolate(__props.product.name)}</h2><p class="text-sm text-gray-500 mb-2 capitalize" data-v-167233dc>${ssrInterpolate(__props.product.brand)}</p><div class="text-gray-700 mb-4" data-v-167233dc>`);
      if (__props.product.priceNew) {
        _push(`<p class="text-sm text-red-600 font-semibold" data-v-167233dc> มือ 1: <span class="text-gray-900 font-bold" data-v-167233dc> ฿${ssrInterpolate(__props.product.priceNew.toLocaleString())}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.product.priceUsed) {
        _push(`<p class="text-sm text-gray-500" data-v-167233dc> มือ 2: <span class="text-gray-800 font-medium" data-v-167233dc> ฿${ssrInterpolate(__props.product.priceUsed.toLocaleString())}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/product/${__props.product.brand.toLowerCase()}/${__props.product.id}`,
        class: "mt-auto w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ดูเพิ่มเติม `);
          } else {
            return [
              createTextVNode(" ดูเพิ่มเติม ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ProductCard = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-167233dc"]]), { __name: "ProductCard" });

export { ProductCard as P };
//# sourceMappingURL=ProductCard-CoFUpE7U.mjs.map
