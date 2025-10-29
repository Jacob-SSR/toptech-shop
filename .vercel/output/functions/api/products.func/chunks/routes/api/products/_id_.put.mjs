import { d as defineEventHandler, g as getRouterParam, r as readBody, c as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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
const _id__put = defineEventHandler(async (event) => {
  var _a, _b, _c;
  try {
    const id = Number(getRouterParam(event, "id"));
    const body = await readBody(event);
    const data = {};
    if (body.sku != null) data.sku = body.sku;
    if (body.name != null) data.name = body.name;
    if (body.brand != null) data.brand = body.brand;
    if (body.category != null) data.category = body.category;
    if (body.priceNew !== void 0)
      data.priceNew = body.priceNew ? Number(body.priceNew) : null;
    if (body.priceUsed !== void 0)
      data.priceUsed = body.priceUsed ? Number(body.priceUsed) : null;
    if (body.basePrice !== void 0)
      data.basePrice = body.basePrice ? Number(body.basePrice) : null;
    if (body.offerPrice !== void 0)
      data.offerPrice = body.offerPrice ? Number(body.offerPrice) : null;
    if (body.condition != null) data.condition = body.condition;
    if (body.percent !== void 0)
      data.percent = body.percent ? Number(body.percent) : null;
    if (body.defects !== void 0) data.defects = (_a = body.defects) != null ? _a : null;
    if (body.description !== void 0)
      data.description = (_b = body.description) != null ? _b : null;
    if (body.images !== void 0) data.images = toStringArray(body.images);
    if (body.detailImages !== void 0)
      data.detailImages = toStringArray(body.detailImages);
    if (body.colors !== void 0) data.colors = toStringArray(body.colors);
    if (body.capacity !== void 0)
      data.capacity = toStringArray(body.capacity);
    if (body.stock != null) data.stock = Number(body.stock);
    if (body.isFeatured !== void 0) data.isFeatured = !!body.isFeatured;
    if (body.status != null) data.status = body.status;
    if (body.adminName !== void 0) data.adminName = (_c = body.adminName) != null ? _c : null;
    const product = await prisma.product.update({
      where: { id },
      data
    });
    return { success: true, product };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update product"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
