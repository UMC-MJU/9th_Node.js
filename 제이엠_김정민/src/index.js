// const express = require('express')  // -> CommonJS
import dotenv from "dotenv";
import express from "express"; // -> ES Module
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controllers.js";
import { handleCreateReview } from "./controllers/review.controllers.js";
import { handleCreateRestaurant } from "./controllers/restaurant.controllers.js";
import { handleAddMissionToRestaurant } from "./controllers/mission.controllers.js";
import { handleStartUserMission } from "./controllers/userMission.controllers.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); //cors 방식 허용
app.use(express.static("public")); //정적 파일 접근
app.use(express.json()); //request의 본문을 json으로 해석할 수 있도록 함.
//(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); //단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 정해진 URL로 POST요청을 보내면 함수가 실행됨.

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
