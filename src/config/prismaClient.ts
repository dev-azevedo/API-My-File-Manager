import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

try {
  prismaClient.$connect();
  console.log("📚 Seccess database connection!");
} catch (error) {
  console.error("❌ Erro connecting the database:", error);
}

export default prismaClient;
