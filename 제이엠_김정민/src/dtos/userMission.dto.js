export const bodyToUserMissionStart = (params, body) => {
  return {
    restaurantId: Number(params.restaurantId || body.restaurantId),
    missionId: Number(params.missionId || body.missionId),
    userId: Number(body.userId),
  };
};

export const responseFromUserMission = (row) => {
  if (!row) return {};
  return {
    id: row.id,
    userId: row.user_id,
    missionId: row.mission_id,
    isActive: !!(row.is_active ?? row.isActive),
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
    completedAt: row.completed_at
      ? new Date(row.completed_at).toISOString()
      : null,
  };
};
