import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/user_mission.dtos.js";
import { userMissionSignUp, listUserMissions, completeUserMission } from "../services/user_mission.service.js";

export const handleUserMissionSignUp = async (req, res, next) => {
    const data = bodyToUserMission(req.body)
    const result = await userMissionSignUp(parseInt(req.params.restaurantId), parseInt(req.params.missionId), data)
    /*
    #swagger.summary = '사용자 미션 도전 API';
    #swagger.parameters['restaurantId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '레스토랑 ID'
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '미션 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 도전 성공 응답",
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
                  userId: { type: "number" },
                  missionId: { type: "number" },
                  status: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM001" },
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
    /*
    #swagger.summary = '사용자 미션 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '사용자 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이지네이션 커서'
    };
    #swagger.responses[200] = {
      description: "사용자 미션 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        userId: { type: "number" },
                        missionId: { type: "number" },
                        status: { type: "string" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "사용자 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM002" },
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
    /*
    #swagger.summary = '사용자 미션 완료 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '사용자 ID'
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '미션 ID'
    };
    #swagger.responses[200] = {
      description: "미션 완료 성공 응답",
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
                  userId: { type: "number" },
                  missionId: { type: "number" },
                  status: { type: "string", example: "COMPLETED" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 완료 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM003" },
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