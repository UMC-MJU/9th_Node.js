import { addUserMission, getUserMission, checkUserMissionExists, getAllUserMissions, changeToCompleteUserMission } from "../repositories/user_mission.repository.js";
import { getRestaurant } from "../repositories/restaurant.repository.js";
import { getMission } from "../repositories/mission.repository.js";
import { getUser } from "../repositories/user.repository.js";
import { responseFromUserMissions } from "../dtos/user_mission.dtos.js";
import { RestaurantNotFoundError, MissionNotFoundError, NotThisRestaurantMissionError, UserNotFoundError, AlreadyChallengedMissionError, UserMissionCreationFailedError } from "../errors/error.js";

export const userMissionSignUp = async (restaurantId, missionId, data) => {
    // 1. 가게 존재 여부 검증
    const restaurant = await getRestaurant(restaurantId);
    if (!restaurant) {
        throw new RestaurantNotFoundError("존재하지 않는 가게입니다");
    }

    // 2. 미션 존재 여부 검증 (그리고 해당 가게의 미션인지 확인)
    const mission = await getMission(missionId);
    if (!mission) {
        throw new MissionNotFoundError("존재하지 않는 미션입니다");
    }
    if (mission.restaurantId !== restaurantId) {
        throw new NotThisRestaurantMissionError("해당 가게의 미션이 아닙니다");
    }

    // 3. 사용자 존재 여부 검증
    const user = await getUser(data.userId);
    if (!user) {
        throw new UserNotFoundError("존재하지 않는 사용자입니다");
    }

    // 4. 이미 도전 중인지 확인
    const alreadyChallenged = await checkUserMissionExists(data.userId, missionId);
    if (alreadyChallenged) {
        throw new AlreadyChallengedMissionError("이미 도전 중인 미션입니다");
    }

    // 5. 사용자 미션 도전 추가
    const joinUserMissionId = await addUserMission({
        userId: data.userId,
        missionId: missionId,
    });

    // 6. 추가된 사용자 미션 조회
    const userMission = await getUserMission(joinUserMissionId);
    if (!userMission) {
        throw new UserMissionCreationFailedError("미션 도전을 생성했지만 조회에 실패했습니다.");
    }

    // 7. 응답 데이터 반환 (snake_case → camelCase 변환)
    return {
        id: userMission.id,
        userId: userMission.userId,
        userName: user.name,
        missionId: userMission.missionId,
        missionName: mission.name,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        status: userMission.status,
    };
};

export const listUserMissions = async (userId,cursor=0) => {
    const missions = await getAllUserMissions(userId,cursor)
    return responseFromUserMissions(missions)
}

export const completeUserMission = async (userId,missionId) => {
    const mission = await changeToCompleteUserMission(userId,missionId)
    return mission
}