import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleCreateStore } from "./controllers/store.controller.js";
import { handleCreateReview } from "./controllers/review.controller.js";
import {
  handleCreateMission,
  handleChallengeMission,
} from "./controllers/mission.controller.js";
import { authenticate } from "./middlewares/auth.middleware.js";

// dotenv 배너 메시지 비활성화
process.env.DOTENV_DISABLE_BANNER = "true";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

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
app.post("/api/v1/stores/:storeId/reviews", authenticate, handleCreateReview);
app.post("/api/v1/stores/:storeId/missions", authenticate, handleCreateMission);
app.post("/api/v1/missions/:missionId/challenges", authenticate, handleChallengeMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});