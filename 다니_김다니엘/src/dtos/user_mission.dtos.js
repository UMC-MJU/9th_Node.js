export const bodyToUserMission = (body) => {
    return {
        userId: body.userId || body.user_id || body.userID,
    };
};

export const responseFromUserMissions = (missions) => {
    return{
        data: missions,
        pagination:{
            cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    }
}

export const bodyToCompleteUserMission = (body) => {
    return {
        userId: body.userId || body.user_id || body.userID,
        missionId: body.missionId || body.mission_id || body.missionID,
    };
}
