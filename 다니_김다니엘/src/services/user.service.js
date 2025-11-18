import bcrypt from "bcryptjs";
import { bodyToUser, responseFromUserReviews } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors/error.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getAllUserReviews,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  // 비밀번호 해싱 (salt rounds: 10)
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    email: data.email,
    password: hashedPassword, // 해싱된 비밀번호 저장
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.",data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return {
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address || "",
    detailAddress: user.detailAddress || "",
    phoneNumber: user.phoneNumber,
    preferences: preferences,
    // 비밀번호는 보안상 응답에 포함하지 않음
  };
};

export const listUserReviews = async (userId,cursor=0) => {
  const reviews = await getAllUserReviews(userId,cursor)
  console.log(reviews)
  return responseFromUserReviews(reviews)
}