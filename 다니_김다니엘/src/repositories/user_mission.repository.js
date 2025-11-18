import { prisma } from "../db.config.js";

// 사용자 미션 도전 추가
export const addUserMission = async (data) => {
    const userMission = await prisma.userMission.create({ data: data })
    return userMission.id
};

// 사용자 미션 도전 조회
export const getUserMission = async (userMissionId) => {
    const userMission = await prisma.userMission.findFirstOrThrow({ where: { id: userMissionId } })
    return userMission
};

// 이미 도전 중인지 확인
export const checkUserMissionExists = async (userId, missionId) => {
    const userMission = await prisma.userMission.findFirst({ where: { userId: userId, missionId: missionId } })
    return userMission ? true : false
};

export const getAllUserMissions = async (userId,cursor=0) => {
    const missions = await prisma.userMission.findMany({
        select:{
            id : true,
            userId : true,
            missionId : true,
            status : true,
        },
        where:{userId : userId,id:{gt:cursor},status:"진행중"},
        orderBy:{id : "asc"},
        take : 5,
    })
    return missions
}

export const changeToCompleteUserMission = async (userId,missionId) => {
    const userMission = await prisma.userMission.findFirst({
        where: { userId: userId, missionId: missionId, status: "진행중" }
    });
    if (!userMission) {
        throw new Error("진행중인 미션을 찾을 수 없습니다");
    }
    const mission = await prisma.userMission.update({
        where: { id: userMission.id },
        data: { status: "완료" }
    });
    return mission;
}