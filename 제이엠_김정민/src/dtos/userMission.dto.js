// 유저에게 미션 등록 시 요청
export const bodyToUserMissionStart = (params, body) => {
  return {
    restaurantId: Number(params.restaurantId || body.restaurantId),
    missionId: Number(params.missionId || body.missionId),
    userId: Number(body.userId),
  };
};
// 유저에게 미션 등록 시 응답
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

// 진행중인 미션 목록 조회 시 응답
export const responseFromActiveUserMissions = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};

// 완료된 미션 목록 조회 시 응답
export const responseFromCompletedUserMissions = (missions) => {
  if (!missions) return { message: "완료된 미션 목록이 없습니다." };
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
