import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dtos.js";
import { restaurantSignUp, listRestaurantReviews,listRestaurantMissions} from "../services/restaurant.service.js";

export const handleRestaurantSignUp = async (req, res, next) => {
    const restaurantData = bodyToRestaurant(req.body)
    const result = await restaurantSignUp(parseInt(req.params.regionID), restaurantData)
    /*
    #swagger.summary = '레스토랑 추가 API';
    #swagger.parameters['regionID'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '지역 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              address: { type: "string" },
              cuisineType: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "레스토랑 추가 성공 응답",
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
                  address: { type: "string" },
                  cuisineType: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "레스토랑 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
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
    res.status(StatusCodes.OK).success(result)
    // try {
    //     console.log("레스토랑 추가를 요청했습니다!");
    //     console.log("body:", req.body);
    //     console.log("body 타입:", typeof req.body);
    //     console.log("regionID:", req.params.regionID);
        
    //     // body가 비어있는지 확인
    //     if (!req.body || Object.keys(req.body).length === 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ error: "요청 body가 비어있습니다." });
    //     }
        
    //     const regionID = parseInt(req.params.regionID); // URL 파라미터에서 받기 (숫자로 변환)
    //     if (isNaN(regionID)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ error: "올바른 regionID를 입력해주세요." });
    //     }
        
    //     const restaurantData = bodyToRestaurant(req.body);
    //     console.log("변환된 데이터:", restaurantData);
        
    //     const restaurant = await restaurantSignUp(regionID, restaurantData);
    //     res.status(StatusCodes.OK).json({ result: restaurant });
    // } catch (err) {
    //     console.error("에러 발생:", err);
    //     console.error("에러 스택:", err.stack);
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}

export const handleListRestaurantReviews = async (req, res, next) => {
    const result = await listRestaurantReviews(
        parseInt(req.params.restaurantId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    /*
    #swagger.summary = '레스토랑 리뷰 목록 조회 API';
    #swagger.parameters['restaurantId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '레스토랑 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이지네이션 커서'
    };
    #swagger.responses[200] = {
      description: "레스토랑 리뷰 목록 조회 성공 응답",
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
                        rating: { type: "number" },
                        content: { type: "string" },
                        userId: { type: "number" }
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
      description: "레스토랑 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R002" },
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
    //     const reviews = await listRestaurantReviews(
    //         parseInt(req.params.restaurantId),
    //         typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    //     );
    //     res.status(StatusCodes.OK).json({ result: reviews });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}

export const handleListRestaurantMissions = async (req, res, next) => {
    const result = await listRestaurantMissions(
        parseInt(req.params.restaurantId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    /*
    #swagger.summary = '레스토랑 미션 목록 조회 API';
    #swagger.parameters['restaurantId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '레스토랑 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이지네이션 커서'
    };
    #swagger.responses[200] = {
      description: "레스토랑 미션 목록 조회 성공 응답",
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
                        name: { type: "string" },
                        content: { type: "string" },
                        isActive: { type: "boolean" },
                        reward: { type: "number" }
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
      description: "레스토랑 미션 목록 조회 실패 응답",
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
    //     const missions = await listRestaurantMissions(
    //         parseInt(req.params.restaurantId),
    //         typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    //     );
    //     res.status(StatusCodes.OK).json({ result: missions });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}