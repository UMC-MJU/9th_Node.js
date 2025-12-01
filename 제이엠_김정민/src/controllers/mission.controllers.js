import { StatusCodes } from "http-status-codes";
import { bodyToRestaurantMission } from "../dtos/mission.dto.js";
import { addMissionToRestaurant } from "../services/mission.service.js";

export const handleAddMissionToRestaurant = async (req, res) => {
  /*
    #swagger.summary = '레스토랑에 미션 추가'
    #swagger.tags = ['Missions']
    #swagger.security = [
    { bearerAuth: [] }]
    #swagger.parameters['restaurantId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '레스토랑 ID',
      example: 3
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missionId: { type: "number", nullable: true, example: 9, description: "기존 미션을 연결하려면 제공" },
              name: { type: "string", nullable: true, example: "인증샷 업로드" },
              description: { type: "string", nullable: true, example: "음식 사진과 함께 후기를 남겨요" },
              isActive: { type: "boolean", nullable: true, example: true },
              pointReward: { type: "number", nullable: true, example: 100 }
            }
          },
          examples: {
            connectExisting: {
              summary: "기존 미션 연결",
              value: { missionId: 9 }
            },
            createNew: {
              summary: "새 미션 생성 후 연결",
              value: { name: "인증샷 업로드", description: "사진과 후기", isActive: true, pointReward: 100 }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "미션 추가 성공",
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
                  id: { type: "number", example: 9 },
                  name: { type: "string", example: "인증샷 업로드" },
                  description: { type: "string", nullable: true, example: "사진과 후기" },
                  isActive: { type: "boolean", example: true },
                  pointReward: { type: "number", nullable: true, example: 100 }
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
                    example: "DUPLICATE_MISSION_NAME",
                    description: "또는 MISSION_ALREADY_EXISTS | REQUIRED_MISSION_FIELDS"
                  },
                  reason: { type: "string", example: "이미 존재하는 미션 이름입니다." },
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
      description: "레스토랑 또는 미션을 찾을 수 없음",
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
                    example: "NOT_FOUND_RESTAURANT",
                    description: "또는 NOT_FOUND_MISSION"
                  },
                  reason: { type: "string", example: "존재하지 않는 레스토랑입니다." },
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
  const data = bodyToRestaurantMission(req.params, req.body);
  const result = await addMissionToRestaurant(data);
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const data = bodyToRestaurantMission(req.params, req.body);
  //   const result = await addMissionToRestaurant(data);
  //   res.status(StatusCodes.CREATED).json({ result });
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};
