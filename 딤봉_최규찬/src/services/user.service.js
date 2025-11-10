import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import { hashPassword } from "../utils/bcrypt.js";

export const userSignUp = async (data) => {
  // 비밀번호 해싱
  const hashedPassword = await hashPassword(data.password);

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    password: hashedPassword, // 해싱된 비밀번호 저장
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};