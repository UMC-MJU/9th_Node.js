import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import * as storeService from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  const regionId = Number(req.params.regionId);
  const dto = bodyToStore(req.body);
  const result = await storeService.createStore({ regionId, ...dto });
  res.status(StatusCodes.CREATED).success(result);
};
