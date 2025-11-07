import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { addRestaurant } from "../services/restaurant.service.js";
import { listRestaurantReviews } from "../services/restaurant.service.js";

export const handleCreateRestaurant = async (req, res) => {
  try {
    const data = bodyToRestaurant(req.body);
    const result = await addRestaurant(data);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const reviews = await listRestaurantReviews(
      parseInt(req.params.restaurantID),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json(reviews);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};
