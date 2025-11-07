import {
  responseFromRestaurant,
  responseFromReviews,
} from "../dtos/restaurant.dto.js";
import {
  getAllRestaurantReviews,
  createRestaurantWithAddress,
  getRestaurantById,
} from "../repositories/restaurant.repositories.js";

export const addRestaurant = async (data) => {
  const { restaurantId } = await createRestaurantWithAddress(data);
  const row = await getRestaurantById(restaurantId);
  return responseFromRestaurant(row);
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
