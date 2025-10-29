import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useSupabaseClient } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@supabase/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-100" }, _attrs))}><div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200"><h1 class="text-2xl font-bold mb-6 text-center text-red-600"> Admin Login </h1><div class="mb-4"><label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Email </label><input${ssrRenderAttr("value", email.value)} id="email" name="email" type="email" placeholder="Email" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"></div><div class="mb-6"><label for="password" class="block text-sm font-medium text-gray-700 mb-1"> Password </label><input${ssrRenderAttr("value", password.value)} id="password" name="password" type="password" placeholder="Password" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"></div><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50 flex justify-center items-center gap-2">`);
      if (!loading.value) {
        _push(`<span>Login</span>`);
      } else {
        _push(`<span>Loading...</span>`);
      }
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-B03ajMUC.mjs.map
