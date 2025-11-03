import { pool } from "../db.config.js";
import * as storeRepo from "../repositories/store.repository.js";
import * as missionRepo from "../repositories/mission.repository.js";
import * as userMissionRepo from "../repositories/userMission.repository.js";

export const createMission = async (input) => {
  const store = await storeRepo.findById(input.storeId);
  if (!store) throw { status: 404, message: "가게를 찾을 수 없습니다." };
  return await missionRepo.insert(input);
};

export const challengeMission = async ({ missionId, userId }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const mission = await missionRepo.findById(conn, missionId);
    if (!mission) throw { status: 404, message: "미션을 찾을 수 없습니다." };

    const existing = await userMissionRepo.findByUnique(conn, missionId, userId, { forUpdate: true });
    if (existing) {
      if (existing.status === "IN_PROGRESS") throw { status: 409, message: "이미 도전 중입니다." };
      await userMissionRepo.updateStatus(conn, missionId, userId, "IN_PROGRESS");
    } else {
      await userMissionRepo.insert(conn, { missionId, userId, status: "IN_PROGRESS" });
    }

    await conn.commit();
    return { missionId, userId, status: "IN_PROGRESS" };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
};
