import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user_mission.dtos.js";
import { userMissionSignUp, listUserMissions, completeUserMission } from "../services/user_mission.service.js";

export const handleUserMissionSignUp = async (req, res, next) => {
    const data = bodyToUserMission(req.body)
    const result = await userMissionSignUp(parseInt(req.params.restaurantId), parseInt(req.params.missionId), data)
    res.status(StatusCodes.OK).success(result);
    // try {
    //     console.log("미션 도전을 요청했습니다!");
    //     console.log("body:", req.body);
    //     console.log("restaurantId:", req.params.restaurantId);
    //     console.log("missionId:", req.params.missionId);
        
    //     // body가 비어있는지 확인
    //     if (!req.body || Object.keys(req.body).length === 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "요청 body가 비어있습니다." 
    //         });
    //     }
        
    //     const restaurantId = parseInt(req.params.restaurantId);
    //     if (isNaN(restaurantId)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "올바른 restaurantId를 입력해주세요." 
    //         });
    //     }

    //     const missionId = parseInt(req.params.missionId);
    //     if (isNaN(missionId)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "올바른 missionId를 입력해주세요." 
    //         });
    //     }
        
    //     const userMissionData = bodyToUserMission(req.body);
    //     console.log("변환된 데이터:", userMissionData);

    //     // userId 유효성 검증
    //     const userId = parseInt(userMissionData.userId);
    //     if (isNaN(userId)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "올바른 userId를 입력해주세요." 
    //         });
    //     }
        
    //     const userMission = await userMissionSignUp(restaurantId, missionId, userMissionData);
    //     res.status(StatusCodes.OK).json({ result: userMission });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
};

export const handleListUserMissions = async (req, res, next) => {
    const missions = await listUserMissions(parseInt(req.params.userId), typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0)
    res.status(StatusCodes.OK).success(missions);
    // try {
    //     const missions = await listUserMissions(
    //         parseInt(req.params.userId),
    //         typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    //     );
    //     res.status(StatusCodes.OK).json({ result: missions });
    // } catch (err) {
    //     console.error("미션 조회 중 오류 발생:", err);
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
};

export const handleCompleteUserMission = async (req, res, next) => {
    const mission = await completeUserMission(parseInt(req.params.userId), parseInt(req.params.missionId))
    res.status(StatusCodes.OK).success(mission);
    // try {
    //     const mission = await completeUserMission(
    //         parseInt(req.params.userId),
    //         parseInt(req.params.missionId)
    //     );
    //     res.status(StatusCodes.OK).json({ result: mission });
    // } catch (err) {
    //     console.error("미션 완료 중 오류 발생:", err);
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}