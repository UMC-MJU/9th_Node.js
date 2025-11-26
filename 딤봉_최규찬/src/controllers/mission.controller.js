import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import * as missionService from "../services/mission.service.js";

export const handleCreateMission = async (req, res, next) => {
  /*
    #swagger.summary = '상점 미션 생성 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '미션을 등록할 상점 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string", nullable: true },
              reward: { type: "number", example: 100 }
            },
            required: ["title", "reward"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 생성 성공 응답",
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
                  storeId: { type: "number" },
                  title: { type: "string" },
                  description: { type: "string", nullable: true },
                  reward: { type: "number" }
                }
              }
            }
          }
        }
      }
    };
  */
  const storeId = Number(req.params.storeId);
  const dto = bodyToMission(req.body);
  const result = await missionService.createMission({ storeId, ...dto });
  res.status(StatusCodes.CREATED).success(result);
};

export const handleGetStoreMissions = async (req, res, next) => {
  /*
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '미션을 조회할 상점 ID'
    };
    #swagger.responses[200] = {
      description: "상점 미션 목록 조회 성공 응답",
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
                  missions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        title: { type: "string" },
                        description: { type: "string", nullable: true },
                        reward: { type: "number" },
                        storeId: { type: "number" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
  const storeId = Number(req.params.storeId);
  const result = await missionService.getStoreMissions(storeId);
  res.success({ missions: result });
};

export const handleGetMyMissions = async (req, res, next) => {
  /*
    #swagger.summary = '내 진행 중인 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록 조회 성공 응답",
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
                  missions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        missionId: { type: "number" },
                        status: { type: "string", example: "IN_PROGRESS" },
                        updatedAt: { type: "string", format: "date-time" },
                        mission: {
                          type: "object",
                          properties: {
                            id: { type: "number" },
                            title: { type: "string" },
                            description: { type: "string", nullable: true },
                            reward: { type: "number" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
  const userId = req.userId;
  const result = await missionService.getMyInProgressMissions(userId);
  res.success({ missions: result });
};

export const handleChallengeMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 시작 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '도전할 미션 ID'
    };
    #swagger.responses[201] = {
      description: "미션 도전 시작 성공 응답",
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
                  missionId: { type: "number" },
                  userId: { type: "number" },
                  status: { type: "string", example: "IN_PROGRESS" }
                }
              }
            }
          }
        }
      }
    };
  */
  const missionId = Number(req.params.missionId);
  const userId = req.userId;
  const result = await missionService.challengeMission({ missionId, userId });
  res.status(StatusCodes.CREATED).success(result);
};

export const handleCompleteMyMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 완료 처리 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '완료 처리할 미션 ID'
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
                  missionId: { type: "number" },
                  status: { type: "string", example: "COMPLETED" },
                  completedAt: { type: "string", format: "date-time" }
                }
              }
            }
          }
        }
      }
    };
  */
  const missionId = Number(req.params.missionId);
  const userId = req.userId;
  const result = await missionService.completeMyMission({ missionId, userId });
  res.success(result);
};