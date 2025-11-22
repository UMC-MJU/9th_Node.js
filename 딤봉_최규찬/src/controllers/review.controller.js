import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import * as reviewService from "../services/review.service.js";

export const handleCreateReview = async (req, res, next) => {
  const storeId = Number(req.params.storeId);
  const userId = req.userId;
  const dto = bodyToReview(req.body);
  const result = await reviewService.createReview({ storeId, userId, ...dto });
  res.status(StatusCodes.CREATED).success(result);
};

export const getReviewList = async (req, res, next) => {
  const storeId = Number(req.params.storeId);
  const { cursorId, size } = req.query;
  const result = await reviewService.getReview(storeId, { cursorId, size });
  res.success(result);
};

export const getMyReviewList = async (req, res, next) => {
  const userId = req.userId;
  const { cursorId, size } = req.query;
  const result = await reviewService.getMyReviews(userId, { cursorId, size });
  res.success(result);
};
