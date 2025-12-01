import { StatusCodes } from "http-status-codes";
import { bodyToUserMissionStart } from "../dtos/userMission.dto.js";
import {
  startUserMission,
  listActiveUserMissions,
  listCompletedUserMissions,
  completeUserMission,
} from "../services/userMission.service.js";
import {
  UserMissionNotFoundError,
  UserMissionAlreadyCompletedError,
  UserNotFoundError,
  MissionNotFoundError,
} from "../error/Error.js";
import { getUser } from "../repositories/user.repositories.js";
import { missionExists } from "../repositories/mission.repositories.js";

// 유저에게 미션 등록
export const handleStartUserMission = async (req, res) => {
  /*
    #swagger.summary = '유저에게 미션 등록 시작'
    #swagger.tags = ['UserMissions']
    #swagger.security = [
    { bearerAuth: [] }]
    #swagger.parameters['restaurantId'] = {
      in: 'path', required: true, type: 'number', description: '레스토랑 ID', example: 3
    }
    #swagger.parameters['missionId'] = {
      in: 'path', required: true, type: 'number', description: '미션 ID', example: 9
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["userId"],
            properties: { userId: { type: "number", example: 7 } }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 등록 성공",
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
                  id: { type: "number", example: 15 },
                  userId: { type: "number", example: 7 },
                  missionId: { type: "number", example: 9 },
                  isActive: { type: "boolean", example: true },
                  createdAt: { type: "string", format: "date-time" },
                  completedAt: { type: "string", format: "date-time", nullable: true }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "잘못된 요청 또는 비즈니스 유효성 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: {
                    type: "string",
                    example: "MISSION_NOT_REGISTERED",
                    description: "또는 VALIDATION_ERROR"
                  },
                  reason: { type: "string", example: "요청 본문이 유효하지 않습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "유저/미션/레스토랑을 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: {
                    type: "string",
                    example: "NOT_FOUND_USER",
                    description: "또는 NOT_FOUND_MISSION | NOT_FOUND_RESTAURANT"
                  },
                  reason: { type: "string", example: "존재하지 않는 사용자입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "unknown" },
                  reason: { type: "string", example: "예상치 못한 오류가 발생했습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  const data = bodyToUserMissionStart(req.params, req.user.id);
  // req.user.id => 로그인한 유저의 ID 를 토큰으로 확인했으므로 body에서 넘겨줄 필요 없음.
  const result = await startUserMission(data);
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const data = bodyToUserMissionStart(req.params, req.body);
  //   const result = await startUserMission(data);
  //   res.status(StatusCodes.CREATED).json({ result });
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

// 진행중인 미션 목록 조회
export const handleListActiveUserMissions = async (req, res) => {
  /*
    #swagger.summary = '유저 진행중인 미션 목록 조회'
    #swagger.tags = ['UserMissions']
    #swagger.security = [
    { bearerAuth: [] }]
    #swagger.parameters['userId'] = {
      in: 'path', required: true, type: 'number', description: '유저 ID', example: 7
    }
    #swagger.parameters['cursor'] = {
      in: 'query', required: false, type: 'number', description: '페이지네이션 커서(마지막 항목 ID)', example: 30
    }
    #swagger.responses[200] = {
      description: "진행중인 미션 목록",
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
                        id: { type: "number", example: 31 },
                        userId: { type: "number", example: 7 },
                        missionId: { type: "number", example: 9 },
                        isActive: { type: "boolean", example: true },
                        createdAt: { type: "string", format: "date-time" },
                        completedAt: { type: "string", format: "date-time", nullable: true }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true, example: 31 }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "진행중인 미션이 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "USER_MISSION_NOT_FOUND" },
                  reason: { type: "string", example: "진행중인 미션이 없습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "unknown" },
                  reason: { type: "string", example: "예상치 못한 오류가 발생했습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  const activeMissions = await listActiveUserMissions(
    Number(req.user.id),
    typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  );

  if (!activeMissions?.data || activeMissions.data.length === 0) {
    // return res.status(404).json({
    //   message: "진행중인 미션이 없습니다.",
    // });
    throw new UserMissionNotFoundError("진행중인 미션이 없습니다.");
  }
  res.status(StatusCodes.OK).success(activeMissions);
  // try {
  //   const activeMissions = await listActiveUserMissions(
  //     Number(req.params.userId),
  //     typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  //   );

  //   if (!activeMissions?.data || activeMissions.data.length === 0) {
  //     // return res.status(404).json({
  //     //   message: "진행중인 미션이 없습니다.",
  //     // });
  //     throw new UserMissionNotFoundError("진행중인 미션이 없습니다.");
  //   }

  //   res.status(StatusCodes.OK).json(activeMissions);
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

// 완료된 미션 목록 조회
// src/controllers/userMission.controllers.js
export const handleListCompletedUserMissions = async (req, res) => {
  /*
    #swagger.summary = '유저 완료된 미션 목록 조회'
    #swagger.tags = ['UserMissions']
    #swagger.security = [
    { bearerAuth: [] }]
    #swagger.parameters['userId'] = {
      in: 'path', required: true, type: 'number', description: '유저 ID', example: 7
    }
    #swagger.parameters['cursor'] = {
      in: 'query', required: false, type: 'number', description: '페이지네이션 커서(마지막 항목 ID)', example: 50
    }
    #swagger.responses[200] = {
      description: "완료된 미션 목록",
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
                        id: { type: "number", example: 51 },
                        userId: { type: "number", example: 7 },
                        missionId: { type: "number", example: 9 },
                        isActive: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time" },
                        completedAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true, example: 51 }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "완료된 미션이 없음(비즈니스 규칙)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "USER_MISSION_ALREADY_COMPLETED" },
                  reason: { type: "string", example: "완료된 미션이 없습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "유저를 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "NOT_FOUND_USER" },
                  reason: { type: "string", example: "존재하지 않는 사용자입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "unknown" },
                  reason: { type: "string", example: "예상치 못한 오류가 발생했습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  // 유저가 있는지 확인
  const user = await getUser(Number(req.user.id));
  if (!user) {
    throw new UserNotFoundError("존재하지 않는 사용자입니다.");
  }

  const completedMissions = await listCompletedUserMissions(
    Number(req.user.id),
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
    // return res.status(404).json({ message: "완료된 미션이 없습니다." });
    // 오류처리 (error.js에서)
    throw new UserMissionAlreadyCompletedError("완료된 미션이 없습니다.");
  }
  res.status(StatusCodes.OK).success(completedMissions);
  // try {
  //   const completedMissions = await listCompletedUserMissions(
  //     Number(req.params.userId),
  //     typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  //   );

  //   if (!completedMissions?.data || completedMissions.data.length === 0) {
  //     // 200으로 빈 상태를 알리고 싶다면:
  //     return res.status(200).json({
  //       message: "완료된 미션이 없습니다.",
  //       data: [],
  //       pagination: { cursor: null },
  //     });

  //     // 404로 처리하고 싶다면 위 return 대신 아래 사용:
  //     // return res.status(404).json({ message: "완료된 미션이 없습니다." });
  //   }

  //   return res.status(200).json(completedMissions);
  // } catch (err) {
  //   return res
  //     .status(400)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

// 특정 유저가 진행 중인 미션을 완료로 변경
export const handleCompleteUserMission = async (req, res) => {
  /*
    #swagger.summary = '유저 미션 완료 처리'
    #swagger.tags = ['UserMissions']
    #swagger.security = [
    { bearerAuth: [] }]
    #swagger.parameters['userId'] = {
      in: 'path', required: true, type: 'number', description: '유저 ID', example: 7
    }
    #swagger.parameters['missionId'] = {
      in: 'path', required: true, type: 'number', description: '미션 ID', example: 9
    }
    #swagger.responses[200] = {
      description: "미션 완료 성공",
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
                    type: "object",
                    properties: {
                      id: { type: "number", example: 60 },
                      userId: { type: "number", example: 7 },
                      missionId: { type: "number", example: 9 },
                      isActive: { type: "boolean", example: false },
                      createdAt: { type: "string", format: "date-time" },
                      completedAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "이미 완료된 미션 등 비즈니스 유효성 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "USER_MISSION_ALREADY_COMPLETED" },
                  reason: { type: "string", example: "이미 완료된 미션입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[404] = {
      description: "유저 또는 미션을 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: {
                    type: "string",
                    example: "NOT_FOUND_USER",
                    description: "또는 NOT_FOUND_MISSION"
                  },
                  reason: { type: "string", example: "존재하지 않는 미션입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
    #swagger.responses[500] = {
      description: "서버 내부 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "unknown" },
                  reason: { type: "string", example: "예상치 못한 오류가 발생했습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  // 유저가 있는지 확인
  const user = await getUser(Number(req.user.id));
  if (!user) {
    throw new UserNotFoundError("존재하지 않는 사용자입니다.");
  }

  // 미션이 있는지 확인
  const mission = await missionExists(Number(req.params.missionId));
  if (!mission) {
    throw new MissionNotFoundError("존재하지 않는 미션입니다.");
  }

  const result = await completeUserMission(
    Number(req.user.id),
    Number(req.params.missionId)
  );
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const result = await completeUserMission(
  //     Number(req.params.userId),
  //     Number(req.params.missionId)
  //   );
  //   return res.status(StatusCodes.OK).json({ result });
  // } catch (err) {
  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};
