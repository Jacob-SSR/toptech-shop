import { d as defineEventHandler, c as createError } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

const index_get = defineEventHandler(async (event) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" }
    });
    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch products"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
