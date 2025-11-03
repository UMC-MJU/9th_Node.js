import { responseFromMission } from "../dtos/mission.dto.js";
import { restaurantExists } from "../repositories/review.repositories.js";
import {
  missionExists,
  createMission,
  getMissionById,
  restaurantMissionExists,
  addRestaurantMission,
} from "../repositories/mission.repositories.js";

export const addMissionToRestaurant = async (data) => {
  const existsRestaurant = await restaurantExists(data.restaurantId);
  if (!existsRestaurant) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  let missionId = data.missionId ?? null;
  if (missionId) {
    const existsMission = await missionExists(missionId);
    if (!existsMission) {
      throw new Error("존재하지 않는 미션입니다.");
    }
  } else {
    if (
      !data.name ||
      data.pointReward === null ||
      data.pointReward === undefined
    ) {
      throw new Error("미션 ID 또는 (name, pointReward) 정보를 제공해주세요.");
    }
    missionId = await createMission({
      name: data.name,
      description: data.description ?? null,
      isActive: data.isActive ?? true,
      pointReward: data.pointReward,
    });
  }

  const duplicated = await restaurantMissionExists(
    data.restaurantId,
    missionId
  );
  if (duplicated) {
    throw new Error("이미 등록된 미션입니다.");
  }

  await addRestaurantMission(data.restaurantId, missionId);
  const mission = await getMissionById(missionId);
  return responseFromMission(mission);
};
