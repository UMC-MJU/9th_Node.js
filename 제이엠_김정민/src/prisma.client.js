import { PrismaClient } from "@prisma/client";

// PrismaClient는 애플리케이션 전역에서 하나만 생성하여 재사용한다.
// Nodemon 등으로 인한 핫리로드 환경에서도 중복 생성을 막는다.
const globalForPrisma = globalThis;

const prisma = globalForPrisma.__prisma || new PrismaClient();
if (!globalForPrisma.__prisma) {
  globalForPrisma.__prisma = prisma;
}

export default prisma;
