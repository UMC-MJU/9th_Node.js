import bcrypt from "bcrypt";
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserFavoriteFoodsByUserId,
  setFavoriteFood,
} from "../repositories/user.repositories.js";

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
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const favoriteFood of data.favoriteFoods) {
    await setFavoriteFood(joinUserId, favoriteFood);
  }

  const user = await getUser(joinUserId);
  const favoriteFoods = await getUserFavoriteFoodsByUserId(joinUserId);

  return responseFromUser({ user, favoriteFoods });
};
