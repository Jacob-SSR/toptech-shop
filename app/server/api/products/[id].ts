import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, "id"));
  const method = event.node.req.method;

  switch (method) {
    case "GET": {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product)
        throw createError({
          statusCode: 404,
          statusMessage: "Product not found",
        });
      return { success: true, product };
    }

    case "PUT": {
      const body = await readBody(event);
      const updated = await prisma.product.update({
        where: { id },
        data: body,
      });
      return { success: true, product: updated };
    }

    case "DELETE": {
      await prisma.product.delete({ where: { id } });
      return { success: true, message: "Deleted successfully" };
    }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      });
  }
});
