import * as storeRepo from "../repositories/store.repository.js";
import * as reviewRepo from "../repositories/review.repository.js";

export const createReview = async (input) => {
  if (input.rating < 1 || input.rating > 5)
    throw { status: 400, message: "평점은 1~5 사이여야 합니다." };

  const store = await storeRepo.findById(input.storeId);
  if (!store) throw { status: 404, message: "가게를 찾을 수 없습니다." };

  return await reviewRepo.insert(input);
};

export const getReview = async (storeId, query) => {
  const store = await storeRepo.findById(storeId);
  if (!store) throw { status: 404, message: "가게를 찾을 수 없습니다." };

  const cursorId = query.cursorId ? Number(query.cursorId) : null;
  const size = query.size ? Number(query.size) : 10;

  if (size < 1 || size > 100) {
    throw { status: 400, message: "size는 1~100 사이여야 합니다." };
  }

  const data = await reviewRepo.getPreviewReview(cursorId, size, storeId);
  return { data, size };
};