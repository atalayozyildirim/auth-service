import { PrismaClient } from "@prisma/client";

const connectDb = async () => {
  try {
    const mysqlConnectstring = process.env.DATABASE_URL;
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: mysqlConnectstring,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export { connectDb };
