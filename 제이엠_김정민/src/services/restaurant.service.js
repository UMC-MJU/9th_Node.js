import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import {
  createRestaurantWithAddress,
  getRestaurantById,
} from "../repositories/restaurant.repositories.js";

export const addRestaurant = async (data) => {
  const { restaurantId } = await createRestaurantWithAddress(data);
  const row = await getRestaurantById(restaurantId);
  return responseFromRestaurant(row);
};

// 리뷰 목록 조회는 review.service로 이동했습니다.
