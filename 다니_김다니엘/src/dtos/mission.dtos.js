export const bodyToMission = (body) => {
    return {
        name: body.name,
        content: body.content || "",
        isActive: body.isActive === "True" || body.isActive === true || body.isActive === "true",
        reward: body.reward || 0,
    };
};
