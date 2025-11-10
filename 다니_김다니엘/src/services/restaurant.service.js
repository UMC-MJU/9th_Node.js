import {
    addRestaurant,
    getRestaurant,
    getRegion,
} from "../repositories/restaurant.repository.js";

export const restaurantSignUp = async (regionId, data) => {
    // region 존재 여부 확인
    const region = await getRegion(regionId);
    if (!region) {
        throw new Error(`존재하지 않는 지역 ID입니다. (regionID: ${regionId})`);
    }

    const joinRestaurantId = await addRestaurant({
        name: data.name,
        address: data.address,
        cuisineType: data.cuisineType,
        regionId: regionId,
    });

    const restaurant = await getRestaurant(joinRestaurantId);
    
    if (!restaurant) {
        throw new Error("레스토랑을 생성했지만 조회에 실패했습니다.");
    }
    
    return {
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        cuisineType: restaurant.cuisine_type,
        regionId: restaurant.region_id,
    };
};