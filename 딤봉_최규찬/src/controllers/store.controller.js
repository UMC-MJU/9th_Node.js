import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import * as storeService from "../services/store.service.js";

export const handleCreateStore = async (req, res, next) => {
  /*
    #swagger.summary = '상점 생성 API';
    #swagger.parameters['regionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      description: '상점을 등록할 지역 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              address: { type: "string", nullable: true },
              category: { type: "string", nullable: true },
              phone: { type: "string", nullable: true }
            },
            required: ["name"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "상점 생성 성공 응답",
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
                  regionId: { type: "number" },
                  address: { type: "string", nullable: true },
                  category: { type: "string", nullable: true },
                  phone: { type: "string", nullable: true }
                }
              }
            }
          }
        }
      }
    };
  */
  const regionId = Number(req.params.regionId);
  const dto = bodyToStore(req.body);
  const result = await storeService.createStore({ regionId, ...dto });
  res.status(StatusCodes.CREATED).success(result);
};
