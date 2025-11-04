import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // 해싱 복잡도 (높을수록 보안 강화, 느려짐)

/**
 * 비밀번호를 해싱합니다
 * @param {string} password - 평문 비밀번호
 * @returns {Promise<string>} 해싱된 비밀번호
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * 평문 비밀번호와 해싱된 비밀번호를 비교합니다
 * @param {string} password - 평문 비밀번호
 * @param {string} hashedPassword - 해싱된 비밀번호
 * @returns {Promise<boolean>} 일치 여부
 */
export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}


