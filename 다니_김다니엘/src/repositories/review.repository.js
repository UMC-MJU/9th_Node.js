import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
    const review = await prisma.review.create({ data: data })
    return review.id
};

// 리뷰 조회
export const getReview = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({ where: { id: reviewId } })
    return review
};
