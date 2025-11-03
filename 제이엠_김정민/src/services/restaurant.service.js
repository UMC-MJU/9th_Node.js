import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import {
  regionExists,
  createRestaurantWithAddress,
  getRestaurantById,
} from "../repositories/restaurant.repositories.js";

export const addRestaurant = async (data) => {
  const exists = await regionExists(data.regionId);
  if (!exists) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  const { restaurantId } = await createRestaurantWithAddress(data);
  const row = await getRestaurantById(restaurantId);
  return responseFromRestaurant(row);
};
