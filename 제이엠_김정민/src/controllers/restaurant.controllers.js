import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { addRestaurant } from "../services/restaurant.service.js";

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
