import {
  responseFromUserMission,
  responseFromCompleteUserMission,
} from "../dtos/userMission.dto.js";
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
  getActiveUserMissions,
  getCompletedUserMissions,
  updateUserMission,
  isUserMissionCompleted,
} from "../repositories/userMission.repositories.js";
import {
  responseFromActiveUserMissions,
  responseFromCompletedUserMissions,
} from "../dtos/userMission.dto.js";
import {
  UserNotFoundError,
  RestaurantNotFoundError,
  MissionNotFoundError,
  MissionNotRegisteredError,
  UserMissionAlreadyCompletedError,
  UserMissionNotFoundError,
} from "../error/Error.js";

export const startUserMission = async (data) => {
  const existsRestaurant = await restaurantExists(data.restaurantId);
  if (!existsRestaurant) {
    // throw new Error("존재하지 않는 가게입니다.");
    throw new RestaurantNotFoundError(
      "존재하지 않는 가게입니다.",
      data.restaurantId
    );
  }

  const existsMission = await missionExists(data.missionId);
  if (!existsMission) {
    // throw new Error("존재하지 않는 미션입니다.");
    throw new MissionNotFoundError("존재하지 않는 미션입니다.", data.missionId);
  }

  const existsMapping = await restaurantMissionExists(
    data.restaurantId,
    data.missionId
  );
  if (!existsMapping) {
    // throw new Error("해당 가게에 등록되지 않은 미션입니다.");
    throw new MissionNotRegisteredError(
      "해당 가게에 등록되지 않은 미션입니다.",
      data.restaurantId
    );
  }

  const user = await getUser(data.userId);
  if (!user) {
    // throw new Error("존재하지 않는 사용자입니다.");
    throw new UserNotFoundError("존재하지 않는 사용자입니다.", data.userId);
  }

  const active = await isUserMissionActive(data.userId, data.missionId);
  if (active) {
    throw new Error("이미 도전 중인 미션입니다.");
  }
  // 이미 완료된 미션
  const completed = await isUserMissionCompleted(data.userId, data.missionId);
  if (completed) {
    throw new UserMissionAlreadyCompletedError(
      "이미 완료된 미션입니다.",
      data.userId
    );
  }

  const insertId = await createUserMissionActive(data.userId, data.missionId);
  const row = await getUserMissionById(insertId);
  return responseFromUserMission(row);
};

// 진행중인 미션 목록 조회
export const listActiveUserMissions = async (userId, cursor = 0) => {
  const missions = await getActiveUserMissions(userId, cursor);
  return responseFromActiveUserMissions(missions);
};

// 완료된 미션 목록 조회
export const listCompletedUserMissions = async (userId, cursor = 0) => {
  const missions = await getCompletedUserMissions(userId, cursor);
  return responseFromCompletedUserMissions(missions);
};

// 특정 유저가 진행 중인 미션을 완료로 변경
export const completeUserMission = async (userId, missionId) => {
  const active = await isUserMissionActive(userId, missionId);
  if (!active) {
    // throw new Error("해당 미션은 진행중이 아닙니다.");
    throw new UserMissionNotFoundError("해당 미션은 진행중이 아닙니다.");
  }
  const updatedId = await updateUserMission(userId, missionId);
  const row = await getUserMissionById(updatedId);
  return responseFromCompleteUserMission(row);
};
