// import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// .env를 가장 먼저 로드해야 환경 변수가 정상적으로 적용됩니다.
dotenv.config();

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

// Prisma Client 인스턴스 생성
// Prisma 7에서는 런타임에 연결 정보를 생성자에 전달해야 합니다.
export const prisma = new PrismaClient({ adapter });

export default prisma;

//ORM 없이 직접 DB 접근 방식
// export const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost", // mysql의 hostname
//   user: process.env.DB_USER || "root", // user 이름
//   port: process.env.DB_PORT || 3306, // 포트 번호
//   database: process.env.DB_NAME || "umc_DB", // 데이터베이스 이름
//   password: process.env.DB_PASSWORD || "rlawjdals1", // 비밀번호
//   waitForConnections: true,
//   // Pool에 획득할 수 있는 connection이 없을 때,
//   // true면 요청을 queue에 넣고 connection을 사용할 수 있게 되면 요청을 실행하며,
//   // false이면 즉시 오류를 내보내고 다시 요청
//   connectionLimit: 10, // 몇 개의 커넥션을 가지게끔 할 것인지
//   queueLimit: 0, // getConnection에서 오류가 발생하기 전에 Pool에 대기할 요청의 개수 한도
// });
