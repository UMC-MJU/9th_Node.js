export const bodyToReview = (body) => {
    return {
        restaurantId: body.restaurantId || body.restaurant_id, // 가게 ID
        userId: body.userId || body.user_id, // 작성자 ID (필수 여부는 DB 스키마에 따라)
        rating: body.rating, // 평점 (예: 1-5)
        content: body.content || "", // 리뷰 내용
        // 필요한 다른 필드들 추가 가능
    };
};