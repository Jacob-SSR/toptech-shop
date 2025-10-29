import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ["error"]
});

export { prisma as p };
//# sourceMappingURL=prisma.mjs.map
