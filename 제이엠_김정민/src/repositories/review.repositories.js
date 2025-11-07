import { prisma } from "../db.config.js";

export const restaurantExists = async (restaurantId) => {
  const found = await prisma.restaurant.findUnique({
    where: { id: Number(restaurantId) },
    select: { id: true },
  });
  return !!found;
};

export const createReview = async (data) => {
  const { userId, restaurantId, description, rating } = data;
  const created = await prisma.review.create({
    data: {
      user_id: Number(userId),
      restaurant_id: Number(restaurantId),
      description,
      rating,
    },
    select: { id: true },
  });
  return created.id;
};

export const getReviewById = async (reviewId) => {
  return await prisma.review.findUnique({
    where: { id: Number(reviewId) },
    select: {
      id: true,
      user_id: true,
      restaurant_id: true,
      description: true,
      created_at: true,
      rating: true,
    },
  });
};

export const getAllRestaurantReviews = async (restaurantId, cursor = 0) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      user_id: true,
      restaurant_id: true,
      description: true,
      rating: true,
    },
    where: { restaurant_id: Number(restaurantId), id: { gt: Number(cursor) } },
    orderBy: { id: "asc" },
    take: 5,
  });
  return reviews;
};
