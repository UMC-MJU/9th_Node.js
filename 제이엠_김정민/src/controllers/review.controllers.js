import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReview } from "../services/review.service.js";

export const handleCreateReview = async (req, res) => {
  try {
    const reviewInput = bodyToReview(req.params, req.body);
    const result = await addReview(reviewInput);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};
