import { prisma } from "../db.config.js";

export const findByUnique = async (tx, missionId, userId) => {
  return await tx.userMission.findUnique({
    where: { missionId_userId: { missionId, userId } },
  });
};

export const insert = async (tx, { missionId, userId, status }) => {
  await tx.userMission.create({
    data: { missionId, userId, status },
  });
};

export const updateStatus = async (tx, missionId, userId, status) => {
  const now = new Date();
  await tx.userMission.update({
    where: { missionId_userId: { missionId, userId } },
    data: {
      status,
      updatedAt: now,
      completedAt: status === "COMPLETED" ? now : null,
    },
  });
};

export const findInProgressByUser = async (userId) => {
  return prisma.userMission.findMany({
    where: { userId: Number(userId), status: "IN_PROGRESS" },
    orderBy: { updatedAt: "desc" },
    include: {
      mission: true,
    },
  });
};
  