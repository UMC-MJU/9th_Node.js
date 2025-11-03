import { responseFromReview } from "../dtos/review.dto.js";
import {
  restaurantExists,
  createReview,
  getReviewById,
} from "../repositories/review.repositories.js";

export const addReview = async (data) => {
  const exists = await restaurantExists(data.restaurantId);
  if (!exists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const insertedId = await createReview(data);
  const review = await getReviewById(insertedId);
  return responseFromReview(review);
};
