import { prisma } from "../db.config.js";

export const findById = async (id) => {
  return await prisma.store.findUnique({ where: { id } });
};

export const insert = async (input) => {
  const created = await prisma.store.create({
    data: {
      name: input.name,
      regionId: input.regionId,
      address: input.address ?? null,
      category: input.category ?? null,
      phone: input.phone ?? null,
    },
  });
  return created;
};
