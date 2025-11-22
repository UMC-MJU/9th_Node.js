import { prisma } from "../db.config.js";

export const findById = async (txOrNull, id) => {
  const db = txOrNull ?? prisma;
  return await db.mission.findUnique({ where: { id } });
};

export const findByStoreId = async (storeId) => {
  return prisma.mission.findMany({
    where: { storeId: Number(storeId) },
    orderBy: { id: "desc" },
  });
};

export const insert = async ({ storeId, title, description, reward }) => {
  const created = await prisma.mission.create({
    data: {
      storeId,
      title,
      description: description ?? null,
      reward,
    },
  });
  return created;
};
