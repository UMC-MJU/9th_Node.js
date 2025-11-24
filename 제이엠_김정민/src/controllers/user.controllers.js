import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

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
  */

  // try {
  //   const user = await userSignUp(bodyToUser(req.body));
  //   // bodyToUser => DTO
  //   res.status(StatusCodes.CREATED).json({ result: user });
  // } catch (err) {
  //   // 중복 이메일 등 비즈니스 오류 처리
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }

  const user = await userSignUp(bodyToUser(req.body));

  res
    .status(StatusCodes.CREATED)
    .success({
      email: user.email,
      name: user.name,
      favoriteFoods: user.favoriteFoods,
    });
};
