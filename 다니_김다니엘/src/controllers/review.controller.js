import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dtos.js";
import { addReviewService } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res, next) => {
    const reviewData = bodyToReview(req.body)
    const result = await addReviewService(reviewData)
    res.status(StatusCodes.OK).success(result);
    // try {
    //     console.log("리뷰 추가를 요청했습니다!");
    //     console.log("body:", req.body);

    //     // body가 비어있는지 확인
    //     if (!req.body || Object.keys(req.body).length === 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "요청 body가 비어있습니다." 
    //         });
    //     }

    //     // restaurantId 유효성 검증
    //     const restaurantId = parseInt(req.body.restaurantId || req.body.restaurant_id);
    //     if (isNaN(restaurantId)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "올바른 restaurantId를 입력해주세요." 
    //         });
    //     }

    //     const reviewData = bodyToReview(req.body);
    //     console.log("변환된 데이터:", reviewData);

    //     const review = await addReviewService(reviewData);
    //     res.status(StatusCodes.OK).json({ result: review });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
};

