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

export const getPreviewReview = async (cursorId, size, storeId) => {
  return prisma.review.findMany({
    where: {
      storeId: Number(storeId),
      id: cursorId ? { lt: Number(cursorId) } : undefined,
    },
    take: size,
    orderBy: { id: "desc" },
    include: {
      user: { select: { name: true } },
    },
  });
};

export const getUserReviews = async (cursorId, size, userId) => {
  return prisma.review.findMany({
    where: {
      userId: Number(userId),
      id: cursorId ? { lt: Number(cursorId) } : undefined,
    },
    take: size,
    orderBy: { id: "desc" },
    include: {
      user: { select: { name: true } },
    },
  });
};