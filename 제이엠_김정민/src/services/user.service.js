import bcrypt from "bcrypt";
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserFavoriteFoodsByUserId,
  setFavoriteFood,
} from "../repositories/user.repositories.js";
import { DuplicateUserEmailError } from "../error/emailError.js";

export const userSignUp = async (data) => {
  // 비밀번호 해싱
  const passwordHash = data.password
    ? await bcrypt.hash(String(data.password), 10)
    : null;
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    phoneNumber: data.phoneNumber,
    createAt: data.createAt,
    province: data.province,
    district: data.district,
    detailAddress: data.detailAddress,
    favoriteFoods: data.favoriteFoods,
    passwordHash,
  });

  if (joinUserId === null) {
    // throw new Error("이미 존재하는 이메일입니다.");
    // 중복 이메일 오류 처리 (미들웨어를 사용해서 이메일 중복 처리하기 위한 에러 핸들러)
    throw new DuplicateUserEmailError(
      "이미 존재하는 이메일입니다.",
      data.email //이메일만 나오게 해서 불필요한 정보 제외.
    );
  }

  for (const favoriteFood of data.favoriteFoods) {
    await setFavoriteFood(joinUserId, favoriteFood);
  }

  const user = await getUser(joinUserId);
  const favoriteFoods = await getUserFavoriteFoodsByUserId(joinUserId);

  return responseFromUser({ user, favoriteFoods });
};
