import { prisma } from "../db.config.js";
// region 존재 여부 확인
export const getRegion = async (regionId) => {
   const region = await prisma.region.findFirstOrThrow({ where: { id: regionId } });
   return region
};

// 1. addRestaurant 함수 수정 - pool.query() 대신 conn.query() 사용
export const addRestaurant = async (data) => {
    const restaurant = await prisma.restaurant.create({ data: data });
    return restaurant.id
};

// 2. getRestaurant 함수 수정 - result 구조 확인 및 예외 처리
export const getRestaurant = async (restaurantId) => {
    const restaurant = await prisma.restaurant.findFirstOrThrow({ where: { id: restaurantId } });
    return restaurant
};

export const getAllRestaurantReviews = async (restaurantId,cursor=0) => {
    const reviews = await prisma.review.findMany({
        select:{
            id : true,
            content : true,
            userId : true,
            restaurantId : true,
        },
        where:{restaurantId : restaurantId,id:{gt:cursor}},
        orderBy:{id : "asc"},
        take : 5,
    })
    return reviews
}

export const getAllRestaurantMissions = async (restaurantId,cursor=0) => {
    const missions = await prisma.mission.findMany({
        select:{
            id : true,
            name : true,
            content : true,
            isActive : true,
            reward : true,
        },
        where:{restaurantId : restaurantId,id:{gt:cursor}},
        orderBy:{id : "asc"},
        take : 5,
    })
    return missions
}