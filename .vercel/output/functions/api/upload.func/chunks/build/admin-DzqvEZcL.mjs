import { defineComponent, ref, mergeProps, unref, withCtx, createBlock, createCommentVNode, createTextVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { a as useSupabaseClient, b as useRoute } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-DBPf8xAO.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _imports_0 = publicAssetsURL("/logo.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminNavbar",
  __ssrInlineRender: true,
  emits: ["toggleSidebar"],
  setup(__props) {
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "h-[72px] flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-200" }, _attrs))}><div class="flex items-center gap-3"><button class="md:hidden text-gray-700 hover:text-red-600"><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><img${ssrRenderAttr("src", _imports_0)} alt="TopTech Logo" class="h-6 object-contain"></div><div class="flex items-center gap-3 text-sm"><span class="text-gray-700 font-medium hidden sm:block">Admin</span><button class="border px-4 py-1.5 rounded-md hover:bg-gray-100 text-sm font-medium"> Logout </button></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminNavbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AdminNavbar = Object.assign(_sfc_main$2, { __name: "AdminNavbar" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props) {
    const route = useRoute();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-[240px] bg-white border-r border-gray-200 flex flex-col h-full" }, _attrs))}><nav class="flex-1 px-3 py-6 space-y-1 text-[15px] font-medium">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/add",
        class: ["relative block px-4 py-2 rounded-md transition", {
          "text-red-600 bg-red-50": unref(route).path === "/admin/add",
          "text-gray-700 hover:bg-gray-50": unref(route).path !== "/admin/add"
        }],
        onClick: ($event) => _ctx.$emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(route).path === "/admin/add") {
              _push2(`<span class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Add Product `);
          } else {
            return [
              unref(route).path === "/admin/add" ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"
              })) : createCommentVNode("", true),
              createTextVNode(" Add Product ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/list",
        class: ["relative block px-4 py-2 rounded-md transition", {
          "text-red-600 bg-red-50": unref(route).path === "/admin/list",
          "text-gray-700 hover:bg-gray-50": unref(route).path !== "/admin/list"
        }],
        onClick: ($event) => _ctx.$emit("close")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(route).path === "/admin/list") {
              _push2(`<span class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` Product List `);
          } else {
            return [
              unref(route).path === "/admin/list" ? (openBlock(), createBlock("span", {
                key: 0,
                class: "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-500 rounded-r"
              })) : createCommentVNode("", true),
              createTextVNode(" Product List ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></aside>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminSidebar = Object.assign(_sfc_main$1, { __name: "AdminSidebar" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarOpen = ref(false);
    const isDesktop = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(AdminNavbar, {
        onToggleSidebar: ($event) => sidebarOpen.value = !sidebarOpen.value
      }, null, _parent));
      _push(`<div class="flex flex-1">`);
      if (sidebarOpen.value || isDesktop.value) {
        _push(ssrRenderComponent(AdminSidebar, {
          class: "fixed md:static inset-y-0 left-0 z-50 w-[240px] bg-white border-r border-gray-200",
          onClose: ($event) => sidebarOpen.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1 p-6 overflow-y-auto bg-white">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
      if (sidebarOpen.value && !isDesktop.value) {
        _push(`<div class="fixed inset-0 bg-black/40 md:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-DzqvEZcL.mjs.map
