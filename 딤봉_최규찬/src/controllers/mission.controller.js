import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import * as missionService from "../services/mission.service.js";

export const handleCreateMission = async (req, res) => {
  try {
    const storeId = Number(req.params.storeId);
    const dto = bodyToMission(req.body);
    const result = await missionService.createMission({ storeId, ...dto });
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
  }
};

export const handleChallengeMission = async (req, res) => {
  try {
    const missionId = Number(req.params.missionId);
    const userId = req.userId;
    
    if (!userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ 
        message: "user-id 헤더가 필요합니다." 
      });
    }
    
    const result = await missionService.challengeMission({ missionId, userId });
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Server Error" });
  }
};