import bcrypt from "bcryptjs";

// 테스트 비밀번호
const plainPassword = "myPassword123";

// 해싱
const hashedPassword = await bcrypt.hash(plainPassword, 10);
console.log("해싱된 비밀번호:", hashedPassword);

// 검증 (로그인 시 사용할 방법)
const testPassword1 = "myPassword123"; // 올바른 비밀번호
const testPassword2 = "wrongPassword"; // 잘못된 비밀번호

const isMatch1 = await bcrypt.compare(testPassword1, hashedPassword);
const isMatch2 = await bcrypt.compare(testPassword2, hashedPassword);

console.log("올바른 비밀번호 검증:", isMatch1); // true
console.log("잘못된 비밀번호 검증:", isMatch2); // false

// 같은 비밀번호를 다시 해싱하면 다른 해시 생성되는지 확인
const hashedPassword2 = await bcrypt.hash(plainPassword, 10);
console.log("같은 비밀번호 재해싱:", hashedPassword2);
console.log("서로 다른 해시인가?", hashedPassword !== hashedPassword2); // true
