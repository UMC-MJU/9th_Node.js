import { prisma } from "../db.config.js";

// 유저에게 미션 등록 시 유저가 해당 미션을 이미 진행중인지 확인
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

// 유저에게 미션 등록
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

// 유저에게 미션 등록 시 유저가 해당 미션을 이미 진행중인지 확인
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

//진행중인 미션 목록 조회
export const getActiveUserMissions = async (userId, cursor = 0) => {
  const missions = await prisma.user_mission.findMany({
    select: {
      id: true,
      user_id: true,
      // 연관된 미션에 대한 필드에서 select 조회
      mission: {
        select: {
          id: true,
          name: true,
          description: true,
          point_reward: true,
        },
      },
    },
    where: {
      user_id: Number(userId),
      is_active: true,
      id: { gt: Number(cursor) },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
  return missions;
};

//완료된 미션 목록 조회
export const getCompletedUserMissions = async (userId, cursor = 0) => {
  const missions = await prisma.user_mission.findMany({
    select: {
      id: true,
      user_id: true,
      mission: {
        select: {
          id: true,
          name: true,
          description: true,
          point_reward: true,
        },
      },
    },
    where: {
      user_id: Number(userId),
      is_active: false,
      id: { gt: Number(cursor) },
    },
    orderBy: { id: "asc" },
    take: 5,
  });
  return missions;
};

// 특정 유저가 진행 중인 미션을 완료로 변경
// src/repositories/userMission.repositories.js
export const updateUserMission = async (userId, missionId) => {
  const updated = await prisma.user_mission.update({
    where: {
      user_id_mission_id: {
        user_id: Number(userId),
        mission_id: Number(missionId),
      },
    },
    data: { is_active: false, completed_at: new Date() },
    select: { id: true },
  });
  return updated.id;
};

// 유저에게 미션 등록 시 유저가 해당 미션을 이미 완료된 미션인지 확인
export const isUserMissionCompleted = async (userId, missionId) => {
  const found = await prisma.user_mission.findFirst({
    where: {
      user_id: Number(userId),
      mission_id: Number(missionId),
      is_active: false,
    },
    select: { id: true },
  });
  return !!found;
};
