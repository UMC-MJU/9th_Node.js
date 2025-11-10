export const bodyToUserMission = (body) => {
    return {
        userId: body.userId || body.user_id || body.userID,
    };
};
