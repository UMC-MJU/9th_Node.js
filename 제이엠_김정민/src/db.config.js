import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Prisma Client 인스턴스 생성
export const prisma = new PrismaClient();

dotenv.config();

//ORM 없이 직접 DB 접근 방식
export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", // mysql의 hostname
  user: process.env.DB_USER || "root", // user 이름
  port: process.env.DB_PORT || 3306, // 포트 번호
  database: process.env.DB_NAME || "umc_DB", // 데이터베이스 이름
  password: process.env.DB_PASSWORD || "rlawjdals1", // 비밀번호
  waitForConnections: true,
  // Pool에 획득할 수 있는 connection이 없을 때,
  // true면 요청을 queue에 넣고 connection을 사용할 수 있게 되면 요청을 실행하며,
  // false이면 즉시 오류를 내보내고 다시 요청
  connectionLimit: 10, // 몇 개의 커넥션을 가지게끔 할 것인지
  queueLimit: 0, // getConnection에서 오류가 발생하기 전에 Pool에 대기할 요청의 개수 한도
});

// 1. Prisma Client의 인스턴스를 생성하는 함수가 필요합니다.
//    (실제 구현은 프로젝트의 prisma setup에 따라 달라집니다.)
// 예시:

// function prismaClientSingleton() {
//   console.log("Creating a new PrismaClient instance...");
//   return new PrismaClient();
// }

// // 2. Node.js의 전역 객체(global)를 사용하여 인스턴스를 저장합니다.
// //    웹 브라우저가 아닌 Node.js 환경이므로 'globalThis' 대신 'global'을 사용해도 무방합니다.

// // 전역 객체에서 기존 인스턴스를 가져오거나, 없다면 null로 설정합니다.
// const existingPrisma = global.prisma;

// // 기존 인스턴스가 있다면 그것을 사용하고, 없다면 새로 생성합니다.
// const prisma = existingPrisma || prismaClientSingleton();

// // 개발 환경 (production이 아닐 때)일 경우,
// // 핫 리로딩 시 재사용할 수 있도록 전역 객체에 저장합니다.
// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// export default prisma;
