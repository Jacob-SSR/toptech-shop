import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const id = Number((_a = event.context.params) == null ? void 0 : _a.id);
  if (!id) throw createError({ statusCode: 400, statusMessage: "Missing product ID" });
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product)
      throw createError({ statusCode: 404, statusMessage: "Product not found" });
    return { product };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch product"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
