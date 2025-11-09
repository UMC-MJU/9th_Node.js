import { StatusCodes } from "http-status-codes";
import { bodyToUserMissionStart } from "../dtos/userMission.dto.js";
import { startUserMission } from "../services/userMission.service.js";

export const handleStartUserMission = async (req, res) => {
  try {
    const data = bodyToUserMissionStart(req.params, req.body);
    const result = await startUserMission(data);
    res.status(StatusCodes.CREATED).json({ result });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};
