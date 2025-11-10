export const bodyToRestaurant = (body) => {
    return {
        name: body.name,
        address: body.address,
        cuisineType: body.cuisineType || body.cuisine_type, // 둘 다 지원
    };
};