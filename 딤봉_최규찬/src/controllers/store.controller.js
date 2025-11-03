import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import * as storeService from "../services/store.service.js";

export const handleCreateStore = async (req, res) => {
  try {
    const regionId = Number(req.params.regionId);
    const dto = bodyToStore(req.body);  // ✅ req.body -> DTO로 변환
    const result = await storeService.createStore({ regionId, ...dto });
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
  }
};