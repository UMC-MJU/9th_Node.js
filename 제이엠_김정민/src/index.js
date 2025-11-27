// const express = require('express')  // -> CommonJS
import dotenv from "dotenv";
import express from "express"; // -> ES Module
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controllers.js";
import {
  handleCreateReview,
  handleListRestaurantReviews,
} from "./controllers/review.controllers.js";
import { handleCreateRestaurant } from "./controllers/restaurant.controllers.js";
import { handleAddMissionToRestaurant } from "./controllers/mission.controllers.js";
import { handleStartUserMission } from "./controllers/userMission.controllers.js";
import { handleListMyReviews } from "./controllers/review.controllers.js";
import {
  handleListActiveUserMissions,
  handleListCompletedUserMissions,
  handleCompleteUserMission,
} from "./controllers/userMission.controllers.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";

dotenv.config();

//passport 초기화
passport.use(googleStrategy); //GoogleStrategy 등록
passport.use(jwtStrategy); //JWTStrategy 등록

const app = express();
const port = process.env.PORT;

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

//cors 방식 허용
app.use(cors()); //정적 파일 접근
app.use(express.static("public"));
//request의 본문을 json으로 해석할 수 있도록 함.(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.json());
//단순 객체 문자열 형태로 본문 데이터 해석 (form-data 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false }));

//passport 세션 없이 사용하기 위해 세션 미들웨어 제거
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Google 로그인 요청
app.get(
  "/oauth2/login/google",
  passport.authenticate("google", {
    session: false,
  })
);
// Google 로그인 콜백 요청
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user;

    res.success({
      resultType: "SUCCESS",
      error: null,
      success: {
        message: "Google 로그인 성공!",
        tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      },
    });
  }
);

// Swagger 세팅
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

//회원가입 요청 처리
app.post("/api/v1/users/signup", handleUserSignUp);

// 레스토랑 리뷰 생성
app.post("/api/v1/restaurants/:restaurantId/reviews", handleCreateReview);

// 가게 생성 (URL에 regionId 불필요)
app.post("/api/v1/restaurants", handleCreateRestaurant);

// 가게에 미션 추가
app.post(
  "/api/v1/restaurants/:restaurantId/missions",
  handleAddMissionToRestaurant
);
// 유저가 가게의 특정 미션 도전 시작
app.post(
  "/api/v1/restaurants/:restaurantId/missions/:missionId/user-missions",
  handleStartUserMission
);
// 가게에 속한 모든 리뷰 조회
app.get(
  "/api/v1/restaurants/:restaurantID/reviews",
  handleListRestaurantReviews
);
//특정 유저가 쓴 리뷰 조회
app.get("/api/v1/users/:userId/reviews", handleListMyReviews);
//특정 유저가 진행중인 미션 목록 조회
app.get("/api/v1/users/:userId/missions/active", handleListActiveUserMissions);
//특정 유저가 진행완료된 미션 목록 조회
app.get(
  "/api/v1/users/:userId/missions/completed",
  handleListCompletedUserMissions
);
// 특정 유저가 진행 중인 미션을 완료로 변경
app.patch(
  "/api/v1/users/:userId/missions/:missionId/complete-mission",
  handleCompleteUserMission
);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err); //⬅️ 이미 응답이 시작되었으므로 Express 기본 에러 핸들러에게 위임
  }
  // 에러코드를 안넣어주면 무조건 500 에러 코드 반환
  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

// 구글로그인 테스트 라우트
const isLogin = passport.authenticate("jwt", { session: false });

app.get("/mypage", isLogin, (req, res) => {
  res.success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
