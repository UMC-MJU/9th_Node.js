import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import * as missionService from "../services/mission.service.js";

export const handleCreateMission = async (req, res, next) => {
  const storeId = Number(req.params.storeId);
  const dto = bodyToMission(req.body);
  const result = await missionService.createMission({ storeId, ...dto });
  res.status(StatusCodes.CREATED).success(result);
};

export const handleGetStoreMissions = async (req, res, next) => {
  const storeId = Number(req.params.storeId);
  const result = await missionService.getStoreMissions(storeId);
  res.success({ missions: result });
};

export const handleGetMyMissions = async (req, res, next) => {
  const userId = req.userId;
  const result = await missionService.getMyInProgressMissions(userId);
  res.success({ missions: result });
};

export const handleChallengeMission = async (req, res, next) => {
  const missionId = Number(req.params.missionId);
  const userId = req.userId;
  const result = await missionService.challengeMission({ missionId, userId });
  res.status(StatusCodes.CREATED).success(result);
};

export const handleCompleteMyMission = async (req, res, next) => {
  const missionId = Number(req.params.missionId);
  const userId = req.userId;
  const result = await missionService.completeMyMission({ missionId, userId });
  res.success(result);
};