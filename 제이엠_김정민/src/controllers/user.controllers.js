import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  //next => 에러를 전역 에러 핸들러로 위임할 때 사용. next(err) 형태로 사용가능
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  //bodyToUser => DTO
  res.status(StatusCodes.OK).json({ result: user });
  // StatusCodes는 라이브러리를 통해 응답 상태 코드를 상수로 사용할 수 있도록 함.
};
