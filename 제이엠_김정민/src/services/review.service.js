import { responseFromReview } from "../dtos/review.dto.js";
import { prisma } from "../db.config.js";
import {
  createReview,
  getReviewById,
} from "../repositories/review.repositories.js";

export const addReview = async (data) => {
  const exists = await prisma.restaurant.findUnique({
    where: { id: Number(data.restaurantId) },
    select: { id: true },
  });
  if (!exists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const insertedId = await createReview(data);
  const review = await getReviewById(insertedId);
  return responseFromReview(review);
};
