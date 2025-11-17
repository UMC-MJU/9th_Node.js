import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  //next => 에러를 전역 에러 핸들러로 위임할 때 사용. next(err) 형태로 사용가능
  console.log("회원가입을 요청했습니다!");
  // 값이 잘 들어오나 확인하기 위한 테스트용
  console.log("body:", req.body);

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
  res.status(StatusCodes.OK).success(user);
  // Express5 + 전역 에러 핸들러가있으므로 try/catch 필요없음
};
