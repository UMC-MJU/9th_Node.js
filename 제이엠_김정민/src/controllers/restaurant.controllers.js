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
              regionId: { type: "number", nullable: true, example: 1 },
              province: { type: "string", nullable: true, example: "서울특별시" },
              district: { type: "string", nullable: true, example: "강남구" },
              name: { type: "string", example: "UMC 맛집" },
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
