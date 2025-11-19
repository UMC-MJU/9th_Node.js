import { prisma } from "../db.config.js";

export const insert = async ({ storeId, userId, rating, content }) => {
  const created = await prisma.review.create({
    data: {
      storeId,
      userId,
      rating,
      content: content ?? null,
    },
  });
  return created;
};