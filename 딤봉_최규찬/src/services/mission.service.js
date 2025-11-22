import { prisma } from "../db.config.js";
import * as storeRepo from "../repositories/store.repository.js";
import * as missionRepo from "../repositories/mission.repository.js";
import * as userMissionRepo from "../repositories/userMission.repository.js";
import { NotFoundError, UnauthorizedError, ConflictError } from "../errors.js";

export const createMission = async (input) => {
  const store = await storeRepo.findById(input.storeId);
  if (!store) throw new NotFoundError("가게", input.storeId);
  return await missionRepo.insert(input);
};

export const challengeMission = async ({ missionId, userId }) => {
  await prisma.$transaction(async (tx) => {
    const mission = await missionRepo.findById(tx, missionId);
    if (!mission) throw new NotFoundError("미션", missionId);

    const existing = await userMissionRepo.findByUnique(tx, missionId, userId);
    if (existing) {
      if (existing.status === "IN_PROGRESS")
        throw new ConflictError("이미 도전 중입니다.", { missionId, userId });
      await userMissionRepo.updateStatus(tx, missionId, userId, "IN_PROGRESS");
    } else {
      await userMissionRepo.insert(tx, { missionId, userId, status: "IN_PROGRESS" });
    }
  });
  return { missionId, userId, status: "IN_PROGRESS" };
};

export const getStoreMissions = async (storeId) => {
  const store = await storeRepo.findById(storeId);
  if (!store) throw new NotFoundError("가게", storeId);

  const missions = await missionRepo.findByStoreId(storeId);
  return missions;
};

export const getMyInProgressMissions = async (userId) => {
  if (!userId) throw new UnauthorizedError();

  const missions = await userMissionRepo.findInProgressByUser(userId);
  return missions.map((item) => ({
    missionId: item.missionId,
    status: item.status,
    updatedAt: item.updatedAt,
    mission: item.mission,
  }));
};

export const completeMyMission = async ({ missionId, userId }) => {
  if (!userId) throw new UnauthorizedError();

  const mission = await missionRepo.findById(null, missionId);
  if (!mission) throw new NotFoundError("미션", missionId);

  const progress = await userMissionRepo.findByUnique(prisma, missionId, userId);
  if (!progress)
    throw new NotFoundError("도전 중인 미션", `${missionId}-${userId}`);

  if (progress.status === "COMPLETED") {
    return {
      missionId,
      status: "COMPLETED",
      completedAt: progress.completedAt,
    };
  }

  await userMissionRepo.updateStatus(prisma, missionId, userId, "COMPLETED");
  return {
    missionId,
    status: "COMPLETED",
    completedAt: new Date(),
  };
};
