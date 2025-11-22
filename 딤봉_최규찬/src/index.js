import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateStore } from "./controllers/store.controller.js";
import {
  handleCreateReview,
  getReviewList,
  getMyReviewList,
} from "./controllers/review.controller.js";
import {
  handleCreateMission,
  handleChallengeMission,
  handleGetStoreMissions,
  handleGetMyMissions,
  handleCompleteMyMission,
} from "./controllers/mission.controller.js";
import { authenticate } from "./middlewares/auth.middleware.js";

// dotenv 배너 메시지 비활성화
process.env.DOTENV_DISABLE_BANNER = "true";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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

// 로깅 미들웨어 (요청 로그 출력)
app.use(morgan("dev")); // 개발 환경: 간단한 로그 형식
// app.use(morgan("combined")); // 프로덕션: 상세한 로그 형식

// 쿠키 파서 미들웨어
app.use(cookieParser());

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Public Routes
app.post("/api/v1/users/signup", handleUserSignUp);

// Protected Routes
app.post("/api/v1/regions/:regionId/stores", authenticate, handleCreateStore);
app.get("/api/v1/users/me/reviews", authenticate, getMyReviewList);
app.get("/api/v1/users/me/missions", authenticate, handleGetMyMissions);
app.get("/api/v1/stores/:storeId/reviews", getReviewList);
app.post("/api/v1/stores/:storeId/reviews", authenticate, handleCreateReview);
app.get("/api/v1/stores/:storeId/missions", handleGetStoreMissions);
app.post("/api/v1/stores/:storeId/missions", authenticate, handleCreateMission);
app.post(
  "/api/v1/missions/:missionId/challenges",
  authenticate,
  handleChallengeMission,
);
app.patch(
  "/api/v1/missions/:missionId/complete",
  authenticate,
  handleCompleteMyMission,
);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
