import { StatusCodes } from "http-status-codes";
import { bodyToRestaurantMission } from "../dtos/mission.dto.js";
import { addMissionToRestaurant } from "../services/mission.service.js";

export const handleAddMissionToRestaurant = async (req, res) => {
  /*
    #swagger.summary = '레스토랑에 미션 추가'
    #swagger.tags = ['Missions']
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
