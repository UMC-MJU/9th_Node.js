import { responseFromReview, responseFromReviews } from "../dtos/review.dto.js";
import { prisma } from "../db.config.js";
import {
  createReview,
  getReviewById,
  getAllRestaurantReviews,
  getAllMyReviews,
} from "../repositories/review.repositories.js";
import { RestaurantNotFoundError, UserNotFoundError } from "../error/Error.js";

export const addReview = async (data) => {
  const exists = await prisma.restaurant.findUnique({
    where: { id: Number(data.restaurantId) },
    select: { id: true },
  });
  if (!exists) {
    // throw new Error("존재하지 않는 가게입니다.");
    throw new RestaurantNotFoundError(
      "존재하지 않는 가게입니다.",
      data.restaurantId
    );
  }

  const insertedId = await createReview(data);
  const review = await getReviewById(insertedId);
  return responseFromReview(review);
};

export const listRestaurantReviews = async (restaurantId, cursor = 0) => {
  const exists = await prisma.restaurant.findUnique({
    where: { id: Number(restaurantId) },
    select: { id: true },
  });
  if (!exists) {
    throw new RestaurantNotFoundError(
      "존재하지 않는 가게입니다.",
      restaurantId
    );
  }

  const normalizedRestaurantId = Number(restaurantId);
  const normalizedCursor = Number(cursor) || 0;

  const reviews = await getAllRestaurantReviews(
    normalizedRestaurantId,
    normalizedCursor
  );
  return responseFromReviews(reviews);
};

export const listMyReviews = async (userId, cursor = 0) => {
  const exists = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true },
  });
  if (!exists) {
    throw new UserNotFoundError("존재하지 않는 유저입니다.", userId);
  }

  const normalizedUserId = Number(userId);
  const normalizedCursor = Number(cursor) || 0;

  const reviews = await getAllMyReviews(normalizedUserId, normalizedCursor);
  return responseFromReviews(reviews);
};
