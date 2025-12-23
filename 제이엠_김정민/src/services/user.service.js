import bcrypt from "bcrypt";
import { responseFromUser, responseFromLoginUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserFavoriteFoodsByUserId,
  setFavoriteFood,
  getUserByEmail,
  updateUser,
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
    role: data.role ?? "USER", //선택 (기본값: USER)
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
  return responseFromLoginUser({ user, accessToken, refreshToken });
};

/// 내 정보 수정 (부분 업데이트)
export const updateMyProfile = async (userId, body) => {
  // 1) 현재 유저 정보 조회
  const existing = await getUser(userId); // getUser는 [user] 배열을 리턴
  if (!existing) {
    throw new UserNotFoundError("존재하지 않는 사용자입니다.", userId);
  }
  const current = existing[0];

  // 2) 부분 업데이트용 data 객체 구성
  const updateData = {};

  if (body.name !== undefined) {
    updateData.name = body.name;
  }
  if (body.phoneNumber !== undefined) {
    updateData.phone_number = body.phoneNumber;
  }
  if (body.gender !== undefined) {
    updateData.gender = body.gender;
  }
  if (body.birth !== undefined) {
    updateData.birth = new Date(body.birth); // "YYYY-MM-DD" 기준
    if (!Number.isNaN(d.getTime())) {
      updateData.birth = d; // ✅ 유효한 날짜일 때만 저장
    }
  }
  if (body.status !== undefined) {
    updateData.status = body.status; // ACTIVE / INACTIVE / ...
  }

  // 비밀번호가 들어오면 해싱해서 저장
  if (body.password !== undefined) {
    updateData.password = await bcrypt.hash(String(body.password), 10);
  }

  // 항상 update_at 갱신
  updateData.update_at = new Date();

  // 3) DB 업데이트 (없는 필드는 건드리지 않음)
  const updated = await updateUserRepo(userId, updateData);

  // 선호 음식 정보까지 포함해서 응답 형태 맞추고 싶으면:
  const favoriteFoods = await getUserFavoriteFoodsByUserId(userId);

  return responseFromUser({
    user: [updated], // responseFromUser가 [user] 형태를 기대
    favoriteFoods,
  });
};

export const updateUserRepo = async (userId, data) => {
  const updated = await updateUser(userId, data);
  return updated;
};
