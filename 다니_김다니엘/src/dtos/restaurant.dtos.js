export const bodyToRestaurant = (body) => {
    return {
        name: body.name,
        address: body.address,
        cuisineType: body.cuisineType || body.cuisine_type, // 둘 다 지원
    };
};

export const responseFromReviews = (reviews) => {
    return{
        data: reviews,
        pagination:{
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    }
}

export const responseFromMissions = (missions) => {
    return{
        data: missions,
        pagination:{
            cursor: missions.length ? missions[missions.length - 1].id : null,
        },
    }
}