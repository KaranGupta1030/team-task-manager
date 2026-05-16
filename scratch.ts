import { PrismaClient } from '@prisma/client'; const prisma = new PrismaClient(); async function main() { const u = await prisma.user.findMany(); console.log(JSON.stringify(u, null, 2)); } main();
