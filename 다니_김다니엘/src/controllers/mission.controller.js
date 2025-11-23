import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dtos.js";
import { missionSignUp } from "../services/mission.service.js";

export const handleMissionSignUp = async (req, res, next) => {
    const missionData = bodyToMission(req.body)
    const result = await missionSignUp(parseInt(req.params.restaurantId), missionData)
    /*
    #swagger.summary = '미션 추가 API';
    #swagger.parameters['restaurantId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '레스토랑 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              content: { type: "string" },
              isActive: { type: "boolean" },
              reward: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  content: { type: "string" },
                  isActive: { type: "boolean" },
                  reward: { type: "number" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */
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
