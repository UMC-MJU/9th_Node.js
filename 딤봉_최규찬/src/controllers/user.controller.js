import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { signToken } from "../utils/jwt.js";

export const handleUserSignUp = async (req, res, next) => {
  const user = await userSignUp(bodyToUser(req.body));
  const token = signToken({ userId: user.id });

  res.status(StatusCodes.OK).success({ ...user, token });
};
