import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const auth = req.headers.authorization || "";
  const [scheme, token] = auth.split(" ");

  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authorization: Bearer <token> 헤더가 필요합니다." });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = Number(decoded.userId);
    if (!req.userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "유효하지 않은 토큰입니다." });
    }
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "토큰 검증에 실패했습니다." });
  }
}


