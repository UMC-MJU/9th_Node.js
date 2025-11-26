import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import * as reviewService from "../services/review.service.js";

export const handleCreateReview = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 작성 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '리뷰를 작성할 상점 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              rating: { type: "number", minimum: 1, maximum: 5 },
              content: { type: "string", nullable: true },
              images: { type: "array", items: { type: "string" } }
            },
            required: ["rating"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 작성 성공 응답",
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
                  userId: { type: "number" },
                  rating: { type: "number" },
                  content: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    };
  */
  const storeId = Number(req.params.storeId);
  const userId = req.userId;
  const dto = bodyToReview(req.body);
  const result = await reviewService.createReview({ storeId, userId, ...dto });
  res.status(StatusCodes.CREATED).success(result);
};

export const getReviewList = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '상점 ID'
    };
    #swagger.parameters['cursorId'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '커서 ID (페이지네이션)'
    };
    #swagger.parameters['size'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '조회할 리뷰 개수 (기본값: 10, 최대: 100)'
    };
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  reviewData: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        nickname: { type: "string" },
                        rating: { type: "number" },
                        content: { type: "string", nullable: true },
                        images: { type: "array", items: { type: "string" } },
                        createdAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  cursorId: { type: "number", nullable: true }
                }
              }
            }
          }
        }
      }
    };
  */
  const storeId = Number(req.params.storeId);
  const { cursorId, size } = req.query;
  const result = await reviewService.getReview(storeId, { cursorId, size });
  res.success(result);
};

export const getMyReviewList = async (req, res, next) => {
  /*
    #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
    #swagger.parameters['cursorId'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '커서 ID (페이지네이션)'
    };
    #swagger.parameters['size'] = {
      in: 'query',
      required: false,
      type: 'number',
      description: '조회할 리뷰 개수 (기본값 10, 최대 100)'
    };
    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공 응답",
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
                  reviewData: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        nickname: { type: "string", nullable: true },
                        rating: { type: "number" },
                        content: { type: "string", nullable: true },
                        images: { type: "array", items: { type: "string" } },
                        createdAt: { type: "string", format: "date-time" }
                      }
                    }
                  },
                  cursorId: { type: "number", nullable: true }
                }
              }
            }
          }
        }
      }
    };
  */
  const userId = req.userId;
  const { cursorId, size } = req.query;
  const result = await reviewService.getMyReviews(userId, { cursorId, size });
  res.success(result);
};
