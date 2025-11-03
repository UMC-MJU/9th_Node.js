import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import * as reviewService from "../services/review.service.js";

export const handleCreateReview = async (req, res) => {
  try {
    const storeId = Number(req.params.storeId);
    const userId = req.userId;
    
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        message: "user-id 헤더가 필요합니다." 
      });
    }
    
    const dto = bodyToReview(req.body);
    const result = await reviewService.createReview({ storeId, userId, ...dto });
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
  }
};