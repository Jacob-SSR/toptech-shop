import { PrismaClient } from "@prisma/client";
import { H3Event } from "h3";

const prisma = new PrismaClient();

export default defineEventHandler(async (event: H3Event) => {
  const method = event.node.req.method;

  switch (method) {
    case "POST": {
      const body = await readBody(event);

      if (!body.name || !body.sku || !body.price) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing required fields",
        });
      }

      const product = await prisma.product.create({
        data: {
          sku: body.sku,
          name: body.name,
          brand: body.brand,
          category: body.category,
          price: body.price,
          offerPrice: body.offerPrice,
          condition: body.condition,
          percent: body.percent,
          defects: body.defects,
          description: body.description,
          images: body.images || [],
          detailImages: body.detailImages || [],
          stock: body.stock || 0,
          isFeatured: body.isFeatured ?? false,
          status: body.status || "active",
          adminName: body.adminName || "System",
        },
      });

      return { success: true, product };
    }

    case "GET": {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
      });
      return { success: true, products };
    }

    default:
      throw createError({
        statusCode: 405,
        statusMessage: "Method Not Allowed",
      });
  }
});
