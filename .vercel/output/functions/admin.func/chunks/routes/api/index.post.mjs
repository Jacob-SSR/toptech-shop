import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@prisma/client';

function toStringArray(v) {
  if (Array.isArray(v)) return v.filter(Boolean);
  if (typeof v === "string" && v.trim()) {
    try {
      return JSON.parse(v);
    } catch {
      return [v];
    }
  }
  return [];
}
const index_post = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const body = await readBody(event);
    const images = toStringArray(body.images);
    const detailImages = toStringArray(body.detailImages);
    const colors = toStringArray(body.colors);
    const capacity = toStringArray(body.capacity);
    const newProduct = await prisma.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        brand: body.brand,
        category: body.category,
        priceNew: body.priceNew ? Number(body.priceNew) : null,
        priceUsed: body.priceUsed ? Number(body.priceUsed) : null,
        basePrice: body.basePrice ? Number(body.basePrice) : null,
        offerPrice: body.offerPrice ? Number(body.offerPrice) : null,
        condition: body.condition || "new",
        percent: body.percent ? Number(body.percent) : null,
        defects: body.defects || null,
        description: body.description || null,
        images,
        detailImages,
        colors,
        capacity,
        stock: Number(body.stock) || 0,
        isFeatured: !!body.isFeatured,
        status: (_a = body.status) != null ? _a : "active",
        adminName: (_b = body.adminName) != null ? _b : null
      }
    });
    return { success: true, product: newProduct };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create product"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
