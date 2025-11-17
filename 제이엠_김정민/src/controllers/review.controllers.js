import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  addReview,
  listRestaurantReviews,
  listMyReviews,
} from "../services/review.service.js";

export const handleCreateReview = async (req, res) => {
  const reviewInput = bodyToReview(req.params, req.body);
  const result = await addReview(reviewInput);
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const reviewInput = bodyToReview(req.params, req.body);
  //   const result = await addReview(reviewInput);
  //   res.status(StatusCodes.CREATED).json({ result });
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

export const handleListRestaurantReviews = async (req, res) => {
  const reviews = await listRestaurantReviews(
    Number(req.params.restaurantID),
    typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
  // try {
  //   const reviews = await listRestaurantReviews(
  //     Number(req.params.restaurantID),
  //     typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  //   );
  //   res.status(StatusCodes.OK).json(reviews);
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

export const handleListMyReviews = async (req, res) => {
  try {
    const reviews = await listMyReviews(
      Number(req.params.userId),
      typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};
