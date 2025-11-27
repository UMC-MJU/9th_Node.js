import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dto.js";
import { addRestaurant } from "../services/restaurant.service.js";

export const handleCreateRestaurant = async (req, res) => {
  /*
    #swagger.summary = '레스토랑 생성'
    #swagger.tags = ['Restaurants']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", example: "UMC 맛집" },
              province: { type: "string", nullable: true, example: "서울특별시" },
              district: { type: "string", nullable: true, example: "강남구" },
              detailAddress: { type: "string", nullable: true, example: "테헤란로 123 4층" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "레스토랑 생성 성공",
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
                  id: { type: "number", example: 10 },
                  name: { type: "string", example: "UMC 맛집" },
                  addressId: { type: "number", nullable: true, example: 5 },
                  detailAddress: { type: "string", nullable: true, example: "테헤란로 123 4층" },
                  region: {
                    type: "object",
                    nullable: true,
                    properties: {
                      id: { type: "number", example: 1 },
                      province: { type: "string", example: "서울특별시" },
                      district: { type: "string", example: "강남구" }
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
                    example: "DUPLICATE_RESTAURANT_NAME",
                    description: "또는 REQUIRED_RESTAURANT_FIELDS"
                  },
                  reason: { type: "string", example: "이미 존재하는 가게 이름입니다." },
                  data: { type: "object", nullable: true, example: { name: "UMC 맛집" } }
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
                  data: { type: "object", nullable: true, example: null }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */
  const data = bodyToRestaurant(req.body);
  const result = await addRestaurant(data);
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const data = bodyToRestaurant(req.body);
  //   const result = await addRestaurant(data);
  //   res.status(StatusCodes.CREATED).json({ result });
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

// 리뷰 조회 관련 핸들러는 review.controllers로 이동했습니다.
