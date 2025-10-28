import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
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
      statusMessage: "Failed to fetch product",
    });
  }
});
