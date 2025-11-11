import { prisma } from "../db.config.js";
import * as storeRepo from "../repositories/store.repository.js";
import * as missionRepo from "../repositories/mission.repository.js";
import * as userMissionRepo from "../repositories/userMission.repository.js";

export const createMission = async (input) => {
  const store = await storeRepo.findById(input.storeId);
  if (!store) throw { status: 404, message: "가게를 찾을 수 없습니다." };
  return await missionRepo.insert(input);
};

export const challengeMission = async ({ missionId, userId }) => {
  await prisma.$transaction(async (tx) => {
    const mission = await missionRepo.findById(tx, missionId);
    if (!mission) throw { status: 404, message: "미션을 찾을 수 없습니다." };

    const existing = await userMissionRepo.findByUnique(tx, missionId, userId);
    if (existing) {
      if (existing.status === "IN_PROGRESS") throw { status: 409, message: "이미 도전 중입니다." };
      await userMissionRepo.updateStatus(tx, missionId, userId, "IN_PROGRESS");
    } else {
      await userMissionRepo.insert(tx, { missionId, userId, status: "IN_PROGRESS" });
    }
  });
  return { missionId, userId, status: "IN_PROGRESS" };
};
