import { prisma } from "../db.config.js";

export const findById = async (id) => {
  return await prisma.region.findUnique({ where: { id } });
};
