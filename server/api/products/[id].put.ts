import prisma from "../../utils/prisma";

function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter(Boolean) as string[];
  if (typeof v === "string" && v.trim()) {
    try {
      return JSON.parse(v);
    } catch {
      return [v];
    }
  }
  return [];
}

export default defineEventHandler(async (event) => {
  try {
    const id = Number(getRouterParam(event, "id"));
    const body = await readBody(event);

    const data: any = {};

    if (body.sku != null) data.sku = body.sku;
    if (body.name != null) data.name = body.name;
    if (body.brand != null) data.brand = body.brand;
    if (body.category != null) data.category = body.category;

    // ✅ เปลี่ยนจาก price / offerPrice → priceNew / priceUsed
    if (body.priceNew !== undefined) data.priceNew = Number(body.priceNew) || 0;
    if (body.priceUsed !== undefined)
      data.priceUsed = body.priceUsed !== null ? Number(body.priceUsed) : null;

    if (body.condition != null) data.condition = body.condition;
    if (body.percent !== undefined)
      data.percent = body.percent != null ? Number(body.percent) : null;
    if (body.defects !== undefined) data.defects = body.defects ?? null;
    if (body.description !== undefined)
      data.description = body.description ?? null;
    if (body.images !== undefined) data.images = toStringArray(body.images);
    if (body.detailImages !== undefined)
      data.detailImages = toStringArray(body.detailImages);
    if (body.stock != null) data.stock = Number(body.stock);
    if (body.isFeatured !== undefined) data.isFeatured = !!body.isFeatured;
    if (body.status != null) data.status = body.status;
    if (body.adminName !== undefined) data.adminName = body.adminName ?? null;

    const product = await prisma.product.update({ where: { id }, data });
    return { success: true, product };
  } catch (error) {
    console.error("❌ Error updating product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update product",
    });
  }
});
