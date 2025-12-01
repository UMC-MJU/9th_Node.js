import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  addReview,
  listRestaurantReviews,
  listMyReviews,
} from "../services/review.service.js";

export const handleCreateReview = async (req, res) => {
  /*
    #swagger.summary = '레스토랑 리뷰 생성'
    #swagger.tags = ['Reviews']
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
            required: ["userId","description","rating"],
            properties: {
              userId: { type: "number", example: 7 },
              description: { type: "string", example: "맛있고 친절했어요!" },
              rating: { type: "number", minimum: 1, maximum: 5, example: 5 }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "리뷰 생성 성공",
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
                  id: { type: "number", example: 12 },
                  userId: { type: "number", example: 7 },
                  restaurantId: { type: "number", example: 3 },
                  description: { type: "string", example: "맛있고 친절했어요!" },
                  rating: { type: "number", example: 5 },
                  createdAt: { type: "string", format: "date-time", example: "2025-11-07T12:34:56.000Z" }
                }
              }
            }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: "잘못된 요청(필드 누락/형식 오류 등)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "VALIDATION_ERROR" },
                  reason: { type: "string", example: "rating은 1~5 사이여야 합니다." },
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
      description: "대상 자원이 존재하지 않음 (유저 또는 레스토랑)",
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
                    description: "또는 NOT_FOUND_USER"
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
  const reviewInput = bodyToReview(req.params, req.body, req.user.id);
  // req.user.id => 로그인한 유저의 ID 를 토큰으로 확인했으므로 body에서 넘겨줄 필요 없음.
  const result = await addReview(reviewInput);
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const reviewInput = bodyToReview(req.params, req.body);
  //   const result = await addReview(reviewInput);
  //   res.status(StatusCodes.CREATED).json({ result });
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

export const handleListRestaurantReviews = async (req, res) => {
  /*
    #swagger.summary = '레스토랑 리뷰 목록 조회'
    #swagger.tags = ['Reviews']
    #swagger.parameters['restaurantID'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '레스토랑 ID',
      example: 3
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '페이지네이션 커서(마지막 리뷰 ID)',
      example: 10
    }
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
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
                        id: { type: "number", example: 11 },
                        userId: { type: "number", example: 7 },
                        restaurantId: { type: "number", example: 3 },
                        description: { type: "string", example: "맛있어요" },
                        rating: { type: "number", example: 4 },
                        createdAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true, example: 11 }
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
      description: "잘못된 요청(쿼리 파라미터 등)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "VALIDATION_ERROR" },
                  reason: { type: "string", example: "cursor는 숫자여야 합니다." },
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
      description: "레스토랑을 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "NOT_FOUND_RESTAURANT" },
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
  const reviews = await listRestaurantReviews(
    Number(req.params.restaurantID),
    typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
  // try {
  //   const reviews = await listRestaurantReviews(
  //     Number(req.params.restaurantID),
  //     typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  //   );
  //   res.status(StatusCodes.OK).json(reviews);
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};

export const handleListMyReviews = async (req, res) => {
  /*
    #swagger.summary = '특정 유저가 작성한 리뷰 목록 조회'
    #swagger.tags = ['Reviews']
    #swagger.security = [
    { bearerAuth: [] }]
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '유저 ID',
      example: 7
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '페이지네이션 커서(마지막 리뷰 ID)',
      example: 20
    }
    #swagger.responses[200] = {
      description: "유저 리뷰 목록 조회 성공",
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
                        id: { type: "number", example: 21 },
                        userId: { type: "number", example: 7 },
                        restaurantId: { type: "number", example: 3 },
                        description: { type: "string", example: "또 방문할게요" },
                        rating: { type: "number", example: 5 },
                        createdAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true, example: 21 }
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
      description: "잘못된 요청(쿼리 파라미터 등)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "VALIDATION_ERROR" },
                  reason: { type: "string", example: "cursor는 숫자여야 합니다." },
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
  const reviews = await listMyReviews(
    Number(req.params.userId),
    typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
  // try {
  //   const reviews = await listMyReviews(
  //     Number(req.params.userId),
  //     typeof req.query.cursor === "string" ? Number(req.query.cursor) : 0
  //   );
  //   res.status(StatusCodes.OK).json(reviews);
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};
