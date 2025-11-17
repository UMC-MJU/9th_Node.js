import { responseFromMission } from "../dtos/mission.dto.js";
import { prisma } from "../db.config.js";
import {
  missionExists,
  createMission,
  getMissionById,
  restaurantMissionExists,
  addRestaurantMission,
  restaurantHasMissionName,
} from "../repositories/mission.repositories.js";
import {
  RestaurantNotFoundError,
  MissionNotFoundError,
  MissionNameDuplicatedError,
  MissionAlreadyExistsError,
  MissionRequiredFieldsError,
} from "../error/Error.js";

export const addMissionToRestaurant = async (data) => {
  const existsRestaurant = await prisma.restaurant.findUnique({
    where: { id: Number(data.restaurantId) },
    select: { id: true },
  });
  if (!existsRestaurant) {
    // throw new Error("존재하지 않는 가게입니다.");
    throw new RestaurantNotFoundError(
      "존재하지 않는 가게입니다.",
      data.restaurantId
    );
  }

  let missionId = data.missionId ?? null;
  if (missionId) {
    const existsMission = await missionExists(missionId);
    if (!existsMission) {
      // throw new Error("존재하지 않는 미션입니다.");
      throw new MissionNotFoundError("존재하지 않는 미션입니다.", missionId);
    }
    // 같은 가게에 동일한 미션 이름이 이미 있는지 확인
    const mission = await getMissionById(missionId);
    const nameDuplicated = await restaurantHasMissionName(
      data.restaurantId,
      mission?.name || ""
    );
    if (nameDuplicated) {
      // throw new Error("해당 가게에 동일한 이름의 미션이 이미 존재합니다.");
      throw new MissionNameDuplicatedError(
        "해당 가게에 동일한 이름의 미션이 이미 존재합니다.",
        data.restaurantId
      );
    }
  } else {
    if (
      !data.name ||
      data.pointReward === null ||
      data.pointReward === undefined
    ) {
      // throw new Error("미션 ID 또는 (name, pointReward) 정보를 제공해주세요.");
      throw new MissionRequiredFieldsError(
        "미션 ID 또는 (name, pointReward) 정보를 제공해주세요.",
        data.restaurantId
      );
    }
    // 같은 가게에 동일한 이름의 미션이 이미 있는지 확인
    const nameDuplicated = await restaurantHasMissionName(
      data.restaurantId,
      data.name
    );
    if (nameDuplicated) {
      // throw new Error("해당 가게에 동일한 이름의 미션이 이미 존재합니다.");
      throw new MissionAlreadyExistsError(
        "해당 가게에 동일한 이름의 미션이 이미 존재합니다.",
        data.restaurantId
      );
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
    // throw new Error("이미 등록된 미션입니다.");
    throw new MissionAlreadyExistsError(
      "이미 등록된 미션입니다.",
      data.restaurantId
    );
  }

  await addRestaurantMission(data.restaurantId, missionId);
  const mission = await getMissionById(missionId);
  return responseFromMission(mission);
};
