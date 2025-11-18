import * as storeRepo from "../repositories/store.repository.js";
import * as reviewRepo from "../repositories/review.repository.js";
import { previewReviewResponseDTO } from "../dtos/review.dto.js";
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from "../errors.js";

export const createReview = async (input) => {
  if (input.rating < 1 || input.rating > 5)
    throw new ValidationError("평점은 1~5 사이여야 합니다.", {
      rating: input.rating,
    });

  const store = await storeRepo.findById(input.storeId);
  if (!store) throw new NotFoundError("가게", input.storeId);

  return await reviewRepo.insert(input);
};

export const getReview = async (storeId, query) => {
  const store = await storeRepo.findById(storeId);
  if (!store) throw new NotFoundError("가게", storeId);

  const cursorId = query.cursorId ? Number(query.cursorId) : null;
  if (cursorId !== null && Number.isNaN(cursorId)) {
    throw new ValidationError("cursorId는 숫자여야 합니다.", {
      cursorId: query.cursorId,
    });
  }

  const size = query.size ? Number(query.size) : 10;
  if (Number.isNaN(size)) {
    throw new ValidationError("size는 숫자여야 합니다.", { size: query.size });
  }

  if (size < 1 || size > 100) {
    throw new ValidationError("size는 1~100 사이여야 합니다.", { size });
  }

  const reviews = await reviewRepo.getPreviewReview(cursorId, size, storeId);
  const nextCursorId =
    reviews.length === size ? reviews[reviews.length - 1].id : null;

  return previewReviewResponseDTO(reviews, nextCursorId);
};

export const getMyReviews = async (userId, query) => {
  if (!userId) throw new UnauthorizedError();

  const cursorId = query.cursorId ? Number(query.cursorId) : null;
  if (cursorId !== null && Number.isNaN(cursorId)) {
    throw new ValidationError("cursorId는 숫자여야 합니다.", {
      cursorId: query.cursorId,
    });
  }

  const size = query.size ? Number(query.size) : 10;
  if (Number.isNaN(size)) {
    throw new ValidationError("size는 숫자여야 합니다.", { size: query.size });
  }

  if (size < 1 || size > 100) {
    throw new ValidationError("size는 1~100 사이여야 합니다.", { size });
  }

  const reviews = await reviewRepo.getUserReviews(cursorId, size, userId);
  const nextCursorId =
    reviews.length === size ? reviews[reviews.length - 1].id : null;

  return previewReviewResponseDTO(reviews, nextCursorId);
};
