import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Starategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();
const secret = process.env.JWT_SECRET; //.env의 비밀키

//JWT 토큰 생성 함수 정의

// ATK 만료시간 1시간
// payload: { id: user.id, email: user.email }
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1h", // 토큰 만료 시간 1시간
  });
};

// RTK 만료시간 14일
// payload: { id: user.id } 최소한의 정보만 담는다.
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, secret, { expiresIn: "14d" });
};

//
