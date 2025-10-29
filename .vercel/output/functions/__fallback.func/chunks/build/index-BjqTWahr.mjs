import { defineComponent, useSSRContext } from 'file://D:/workshop/FullStack/toptech_shop/node_modules/vue/index.mjs';
import { n as navigateTo } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'file://D:/workshop/FullStack/toptech_shop/node_modules/vue/server-renderer/index.mjs';
import 'file://D:/workshop/FullStack/toptech_shop/node_modules/unhead/dist/server.mjs';
import 'file://D:/workshop/FullStack/toptech_shop/node_modules/devalue/index.js';
import 'file://D:/workshop/FullStack/toptech_shop/node_modules/unhead/dist/utils.mjs';
import 'file://D:/workshop/FullStack/toptech_shop/node_modules/vue-router/vue-router.node.mjs';
import 'file://D:/workshop/FullStack/toptech_shop/node_modules/@supabase/ssr/dist/main/index.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    navigateTo("/admin/list");
    return () => {
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BjqTWahr.mjs.map
