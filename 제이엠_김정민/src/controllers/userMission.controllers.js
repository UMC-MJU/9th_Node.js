import { StatusCodes } from "http-status-codes";
import { bodyToUserMissionStart } from "../dtos/userMission.dto.js";
import {
  startUserMission,
  listActiveUserMissions,
  listCompletedUserMissions,
} from "../services/userMission.service.js";

// 유저에게 미션 등록
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

// 진행중인 미션 목록 조회
export const handleListActiveUserMissions = async (req, res) => {
  try {
    const activeMissions = await listActiveUserMissions(
      Number(req.params.userId),
      typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
    );

    if (!activeMissions?.data || activeMissions.data.length === 0) {
      return res.status(404).json({
        message: "진행중인 미션이 없습니다.",
      });
    }

    res.status(StatusCodes.OK).json(activeMissions);
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};

// 완료된 미션 목록 조회
// src/controllers/userMission.controllers.js
export const handleListCompletedUserMissions = async (req, res) => {
  try {
    const completedMissions = await listCompletedUserMissions(
      Number(req.params.userId),
      typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
    );

    if (!completedMissions?.data || completedMissions.data.length === 0) {
      // 200으로 빈 상태를 알리고 싶다면:
      // return res.status(200).json({
      //   message: "완료된 미션이 없습니다.",
      //   data: [],
      //   pagination: { cursor: null },
      // });

      // 404로 처리하고 싶다면 위 return 대신 아래 사용:
      return res.status(404).json({ message: "완료된 미션이 없습니다." });
    }

    return res.status(200).json(completedMissions);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "요청을 처리할 수 없습니다." });
  }
};
