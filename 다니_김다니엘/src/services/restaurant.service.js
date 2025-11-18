import {
    addRestaurant,
    getRestaurant,
    getRegion,
    getAllRestaurantReviews,
    getAllRestaurantMissions,
} from "../repositories/restaurant.repository.js";
import { responseFromReviews, responseFromMissions } from "../dtos/restaurant.dtos.js";
import { InvalidRegionIdError, RestaurantCreationFailedError } from "../errors/error.js";

export const restaurantSignUp = async (regionId, data) => {
    // region 존재 여부 확인
    const region = await getRegion(regionId);
    if (!region) {
        throw new InvalidRegionIdError(`존재하지 않는 지역 ID입니다. (regionID: ${regionId})`);
    }

    const joinRestaurantId = await addRestaurant({
        name: data.name,
        address: data.address,
        cuisineType: data.cuisineType,
        regionId: regionId,
    });

    const restaurant = await getRestaurant(joinRestaurantId);
    
    if (!restaurant) {
        throw new RestaurantCreationFailedError("레스토랑을 생성했지만 조회에 실패했습니다.");
    }
    
    return {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        cuisineType: restaurant.cuisineType,
        regionId: restaurant.regionId,
    };
};

export const listRestaurantReviews = async (restaurantId,cursor=0) => {
    const reviews = await getAllRestaurantReviews(restaurantId,cursor)
    return responseFromReviews(reviews)
  }

export const listRestaurantMissions = async (restaurantId,cursor=0) => {
    const missions = await getAllRestaurantMissions(restaurantId,cursor)
    return responseFromMissions(missions)
}