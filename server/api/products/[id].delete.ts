import prisma from "../../utils/prisma";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  if (!id)
    throw createError({ statusCode: 400, statusMessage: "Missing product ID" });

  try {
    await prisma.product.delete({ where: { id } });
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete product",
    });
  }
});
