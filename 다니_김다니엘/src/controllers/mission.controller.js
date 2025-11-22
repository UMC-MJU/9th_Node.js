import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dtos.js";
import { missionSignUp } from "../services/mission.service.js";

export const handleMissionSignUp = async (req, res, next) => {
    const missionData = bodyToMission(req.body)
    const result = await missionSignUp(parseInt(req.params.restaurantId), missionData)
    res.status(StatusCodes.OK).success(result);
    // try {
    //     console.log("미션 추가를 요청했습니다!");
    //     console.log("body:", req.body);
    //     console.log("restaurantID:", req.params.restaurantID);
        
    //     // body가 비어있는지 확인
    //     if (!req.body || Object.keys(req.body).length === 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "요청 body가 비어있습니다." 
    //         });
    //     }
        
    //     const restaurantID = parseInt(req.params.restaurantID);
    //     if (isNaN(restaurantID)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ 
    //             error: "올바른 restaurantID를 입력해주세요." 
    //         });
    //     }
        
    //     const missionData = bodyToMission(req.body);
    //     console.log("변환된 데이터:", missionData);
        
    //     const mission = await missionSignUp(restaurantID, missionData);
    //     res.status(StatusCodes.OK).json({ result: mission });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
};
