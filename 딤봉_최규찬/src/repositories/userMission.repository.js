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
  await tx.userMission.update({
    where: { missionId_userId: { missionId, userId } },
    data: { status, updatedAt: new Date(), completedAt: null },
  });
};
  