import { addMission, getMission } from "../repositories/mission.repository.js";
import { getRestaurant } from "../repositories/restaurant.repository.js";

export const missionSignUp = async (restaurantId, data) => {
    // 1. 가게 존재 여부 검증
    const restaurant = await getRestaurant(restaurantId);
    if (!restaurant) {
        throw new Error("존재하지 않는 가게입니다");
    }

    // 2. 미션 추가
    const joinMissionId = await addMission({
        restaurantId: restaurantId,
        name: data.name,
        content: data.content,
        isActive: data.isActive,
        reward: data.reward,
    });

    // 3. 추가된 미션 조회
    const mission = await getMission(joinMissionId);
    if (!mission) {
        throw new Error("미션을 생성했지만 조회에 실패했습니다.");
    }

    // 4. 응답 데이터 반환 (snake_case → camelCase 변환)
    return {
        id: mission.id,
        restaurantId: mission.restaurant_id,
        restaurantName: restaurant.name,
        name: mission.name,
        content: mission.content,
        isActive: mission.is_active === 1 || mission.is_active === true,
        reward: mission.reward,
    };
};
