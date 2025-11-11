import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleRestaurantSignUp } from "./controllers/restaurant.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
import { handleMissionSignUp } from "./controllers/mission.controller.js";
import { handleUserMissionSignUp } from "./controllers/user_mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근

// JSON 파싱 에러 처리
app.use(express.json({
    verify: (req, res, buf) => {
        try {
            JSON.parse(buf);
        } catch (e) {
            res.status(400).json({ error: "JSON 형식이 올바르지 않습니다." });
            throw new Error("Invalid JSON");
        }
    }
}));                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 디버깅: 모든 요청 로그 출력
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
// app.post("/api/v1/regions/:regionID/restaurants", handleRestaurantSignUp);
// app.post("/api/v1/restaurants/review", handleReviewSignUp);
// app.post("/api/v1/restaurants/:restaurantId/missions/:missionId/user-missions", handleUserMissionSignUp);
// app.post("/api/v1/restaurants/:restaurantID/missions", handleMissionSignUp);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});