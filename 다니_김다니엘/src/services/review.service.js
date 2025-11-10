import { addReview, getReview } from "../repositories/review.repository.js";
import { getRestaurant } from "../repositories/restaurant.repository.js";

export const addReviewService = async (data) => {
    // 1. 가게 존재 여부 검증
    const restaurant = await getRestaurant(data.restaurantId);
    if (!restaurant) {
        throw new Error("존재하지 않는 가게입니다");
    }

    // 2. 리뷰 추가
    const reviewId = await addReview({
        restaurantId: data.restaurantId,
        userId: data.userId,
        rating: data.rating,
        content: data.content,
    });

    // 3. 추가된 리뷰 조회
    const review = await getReview(reviewId);
    if (!review) {
        throw new Error("리뷰를 생성했지만 조회에 실패했습니다.");
    }

    // 4. 응답 데이터 반환 (snake_case → camelCase 변환)
    return {
        id: review.id,
        restaurantId: review.restaurant_id,
        restaurantName: restaurant.name,
        userId: review.user_id,
        rating: review.rating,
        content: review.content,
    };
};