import bcrypt from "bcrypt";
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserFavoriteFoodsByUserId,
  setFavoriteFood,
  getUserByEmail,
} from "../repositories/user.repositories.js";
import {
  DuplicateUserEmailError,
  InvalidPasswordError,
  UserNotFoundError,
} from "../error/Error.js";
import { generateAccessToken, generateRefreshToken } from "../auth.config.js";

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

// 로그인 서비스
export const userSignIn = async (data) => {
  // 1) 이메일로 사용자 조회
  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new UserNotFoundError("존재하지 않는 이메일입니다.", data.email);
  }

  // 2) 비밀번호 검증 (DB에는 bcrypt 해시가 password 컬럼에 저장돼 있음)
  const isPasswordValid = await bcrypt.compare(
    String(data.password),
    user.password
  );
  if (!isPasswordValid) {
    throw new InvalidPasswordError("비밀번호가 일치하지 않습니다.", data.email);
  }

  // 3) 액세스/리프레시 토큰 발급
  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
  });
  const refreshToken = generateRefreshToken({ id: user.id });

  // 4) 클라이언트에 내려줄 최소 정보와 토큰 반환
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    accessToken,
    refreshToken,
  };
};
