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

    const newProduct = await prisma.product.create({
      data: {
        sku: body.sku,
        name: body.name,
        brand: body.brand,
        category: body.category,
        priceNew: Number(body.priceNew) || 0,
        priceUsed:
          body.priceUsed !== undefined && body.priceUsed !== null
            ? Number(body.priceUsed)
            : null,
        condition: body.condition || "new",
        percent: body.percent ? Number(body.percent) : null,
        defects: body.defects || null,
        description: body.description || null,
        images,
        detailImages,
        stock: Number(body.stock) || 0,
        isFeatured: !!body.isFeatured,
        status: (body.status ?? "active") as any,
        adminName: body.adminName ?? null,
      },
    });

    return { success: true, product: newProduct };
  } catch (error) {
    console.error("❌ Error creating product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create product",
    });
  }
});
