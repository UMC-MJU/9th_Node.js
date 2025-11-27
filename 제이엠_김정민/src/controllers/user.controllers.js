import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToLoginUser } from "../dtos/user.dto.js";
import {
  userSignUp,
  userSignIn,
  updateMyProfile,
} from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  //next => 에러를 전역 에러 핸들러로 위임할 때 사용. next(err) 형태로 사용가능
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  /*
    #swagger.summary = '회원 가입 API';
    #swagger.tags = ['Users']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email","name","gender","birth","phoneNumber","favoriteFoods","password"],
            properties: {
              email: { type: "string", example: "test@example.com" },
              name: { type: "string", example: "test" },
              gender: { type: "string", enum: ["MALE","FEMALE"], example: "MALE" },
              birth: { type: "string", format: "date", example: "1999-01-23" },
              province: { type: "string", example: "서울특별시" },
              district: { type: "string", example: "강남구" },
              detailAddress: { type: "string", example: "테헤란로 123 4층" },
              phoneNumber: { type: "string", example: "010-1234-5678" },
              favoriteFoods: { type: "array", items: { type: "number" }, example: [1, 2, 3] },
              password: { type: "string", format: "password", example: "Passw0rd!" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string", example: "user@example.com" },
                  name: { type: "string", example: "김정민" },
                  favoriteFoods: { type: "array", items: { type: "string" }, example: ["한식", "일식", "중식"] }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "DUPLICATE_USER_EMAIL" },
                  reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                  data: { type: "object", example: "test@example.com" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
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
    };
  */
  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.CREATED).success({
    email: user.email,
    name: user.name,
    favoriteFoods: user.favoriteFoods,
  });
};

export const handleUserSignIn = async (req, res, next) => {
  console.log("로그인을 요청했습니다!");
  console.log("body:", req.body);

  const loginResult = await userSignIn(bodyToLoginUser(req.body));

  res.status(StatusCodes.OK).success({
    email: loginResult.email,
    name: loginResult.name,
    accessToken: loginResult.accessToken,
    refreshToken: loginResult.refreshToken,
  });

  /*
    #swagger.summary = '로그인 API'
    #swagger.tags = ['Users']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email","password"],
            properties: {
              email: { type: "string", example: "test@example.com" },
              password: { type: "string", format: "password", example: "Passw0rd!" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "로그인 성공 (JWT 토큰 발급)",
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
                  id: { type: "number", example: 1 },
                  email: { type: "string", example: "test@example.com" },
                  name: { type: "string", example: "김정민" },
                  accessToken: { type: "string" },
                  refreshToken: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  */
};

// 내 정보 수정 핸들러
export const handleUpdateMyProfile = async (req, res, next) => {
  console.log("내 정보 수정을 요청했습니다!");
  console.log("body:", req.body);

  const updateResult = await updateMyProfile(req.user.id, bodyToUser(req.body));
  res.status(StatusCodes.OK).success({
    email: updateResult.email,
    name: updateResult.name,
    favoriteFoods: updateResult.favoriteFoods,
  });
  /*
    #swagger.summary = '내 정보 수정 API'
    #swagger.tags = ['Users']
    #swagger.security = [
    { bearerAuth: [] }
    
    #swagger.requestBody = {
      required: false,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "김정민" },
              phoneNumber: { type: "string", example: "010-1234-5678" },
              gender: { type: "string", enum: ["MALE","FEMALE","OTHER"], example: "MALE" },
              birth: { type: "string", format: "date", example: "1999-01-23" },
              status: { type: "string", enum: ["ACTIVE","INACTIVE","SUSPENDED","DELETED"], example: "ACTIVE" },
              password: { type: "string", format: "password", example: "NewPassw0rd!" }
            }
          }
        }
      }
    }
  */
};
