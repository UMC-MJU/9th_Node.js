import { prisma } from "../db.config.js";

export const missionExists = async (missionId) => {
  const found = await prisma.mission.findUnique({
    where: { id: Number(missionId) },
    select: { id: true },
  });
  return !!found;
};

export const getMissionById = async (missionId) => {
  return await prisma.mission.findUnique({
    where: { id: Number(missionId) },
    select: {
      id: true,
      name: true,
      description: true,
      is_active: true,
      point_reward: true,
    },
  });
};

export const createMission = async (data) => {
  const created = await prisma.mission.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      is_active: data.isActive ?? true,
      point_reward: data.pointReward ?? 0,
    },
    select: { id: true },
  });
  return created.id;
};

export const restaurantMissionExists = async (restaurantId, missionId) => {
  const found = await prisma.restaurant_mission_map.findUnique({
    where: {
      restaurant_id_mission_id: {
        restaurant_id: Number(restaurantId),
        mission_id: Number(missionId),
      },
    },
    select: { mission_id: true },
  });
  return !!found;
};

export const addRestaurantMission = async (restaurantId, missionId) => {
  await prisma.restaurant_mission_map.create({
    data: {
      restaurant_id: Number(restaurantId),
      mission_id: Number(missionId),
    },
  });
};
