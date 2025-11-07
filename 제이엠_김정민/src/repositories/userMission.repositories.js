import { prisma } from "../db.config.js";

export const isUserMissionActive = async (userId, missionId) => {
  const found = await prisma.user_mission.findFirst({
    where: {
      user_id: Number(userId),
      mission_id: Number(missionId),
      is_active: true,
    },
    select: { id: true },
  });
  return !!found;
};

export const createUserMissionActive = async (userId, missionId) => {
  const created = await prisma.user_mission.create({
    data: {
      user_id: Number(userId),
      mission_id: Number(missionId),
      is_active: true,
    },
    select: { id: true },
  });
  return created.id;
};

export const getUserMissionById = async (id) => {
  return await prisma.user_mission.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      user_id: true,
      mission_id: true,
      is_active: true,
      created_at: true,
      completed_at: true,
    },
  });
};
