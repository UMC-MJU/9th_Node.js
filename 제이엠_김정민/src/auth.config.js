import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

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

// Google 로그인 전략 정의

// GoogleVerify 함수 정의
const googleverify = async (profile) => {
  //이메일 조회
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }
  // 이메일로 사용자 조회
  const user = await prisma.user.findFirst({
    where: { email },
  });
  // 사용자가 있으면 사용자 정보 반환
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email: email,
      phone_number: "추후수정",
      name: profile.displayName,
      gender: "OTHER",
      birth: new Date(2001, 5, 1),
      create_at: new Date(),
      update_at: new Date(),
      // password: "1234",
    },
  });
  return { id: created.id, email: created.email, name: created.name };
};

// GoogleStrategy 정의
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/callback/google",
    scope: ["email", "profile"],
  },

  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await googleverify(profile);

      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateRefreshToken(user);

      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
      });
    } catch (error) {
      return cb(error);
    }
  }
);

// JWT 검증 미들웨어 만들기
const jwtOptions = {
  // 요청 헤더의 'Authorization'에서 'Bearer <token>' 토큰을 추출
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await prisma.user.findFirst({ where: { id: payload.id } });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
);

// ADMIN 권한 확인 미들웨어
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).error({
      errorCode: "FORBIDDEN",
      reason: "관리자 권한이 필요합니다.",
      data: null,
    });
  }
  next();
};
