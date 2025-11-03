import { responseFromUserMission } from "../dtos/userMission.dto.js";
import { restaurantExists } from "../repositories/review.repositories.js";
import {
  missionExists,
  restaurantMissionExists,
} from "../repositories/mission.repositories.js";
import { getUser } from "../repositories/user.repositories.js";
import {
  isUserMissionActive,
  createUserMissionActive,
  getUserMissionById,
} from "../repositories/userMission.repositories.js";

export const startUserMission = async (data) => {
  const existsRestaurant = await restaurantExists(data.restaurantId);
  if (!existsRestaurant) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const existsMission = await missionExists(data.missionId);
  if (!existsMission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const existsMapping = await restaurantMissionExists(
    data.restaurantId,
    data.missionId
  );
  if (!existsMapping) {
    throw new Error("해당 가게에 등록되지 않은 미션입니다.");
  }

  const user = await getUser(data.userId);
  if (!user) {
    throw new Error("존재하지 않는 사용자입니다.");
  }

  const active = await isUserMissionActive(data.userId, data.missionId);
  if (active) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const insertId = await createUserMissionActive(data.userId, data.missionId);
  const row = await getUserMissionById(insertId);
  return responseFromUserMission(row);
};
