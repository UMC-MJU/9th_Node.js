import { prisma } from "../db.config.js";

// 미션 추가
export const addMission = async (data) => {
    const mission = await prisma.mission.create({ data: data })
    return mission.id
};

// 미션 조회
export const getMission = async (missionId) => {
    const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } })
    return mission
};
