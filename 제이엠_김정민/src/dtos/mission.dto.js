export const bodyToRestaurantMission = (params, body) => {
  const restaurantId = Number(params.restaurantId || body.restaurantId);
  const missionId = body.missionId ? Number(body.missionId) : null;

  return {
    restaurantId,
    missionId,
    // 새 미션 생성용 필드(미션 ID 미제공 시 사용)
    name: body.name,
    description: body.description ?? null,
    isActive: body.isActive === undefined ? true : Boolean(body.isActive),
    pointReward:
      body.pointReward !== undefined ? Number(body.pointReward) : null,
  };
};

export const responseFromMission = (row) => {
  if (!row) return {};
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? null,
    isActive: row.is_active === undefined ? row.isActive : !!row.is_active,
    pointReward: row.point_reward,
  };
};
