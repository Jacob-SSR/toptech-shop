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
        status: (body.status ?? "active") as any,
        adminName: body.adminName ?? null,
      },
    });

    return { success: true, product: newProduct };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create product",
    });
  }
});
