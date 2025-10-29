import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    const products = await prisma.product.findMany({
      where: { status: "active" },
      orderBy: { id: "desc" },
    });

    return { products };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch products",
    });
  }
});
