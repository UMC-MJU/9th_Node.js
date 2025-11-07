import { responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import { prisma } from "../db.config.js";
import {
  createReview,
  getReviewById,
  getAllRestaurantReviews,
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

export const listRestaurantReviews = async (restaurantId, cursor = 0) => {
  const normalizedRestaurantId = Number(restaurantId);
  const normalizedCursor = Number(cursor) || 0;

  const reviews = await getAllRestaurantReviews(
    normalizedRestaurantId,
    normalizedCursor
  );
  return responseFromReviews(reviews);
};
