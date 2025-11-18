import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { handleUserSignUp, handleListUserReviews} from "./controllers/user.controller.js";
import { handleRestaurantSignUp, handleListRestaurantMissions} from "./controllers/restaurant.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
import { handleMissionSignUp } from "./controllers/mission.controller.js";
import { handleUserMissionSignUp, handleListUserMissions, handleCompleteUserMission } from "./controllers/user_mission.controller.js";
import { handleListRestaurantReviews } from "./controllers/restaurant.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

//공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({resultType : "SUCCESS", error : null, success : success})
  }

  res.error = ({errorCode = "unknown", reason = null , data = null}) => {
    return res.json({
      resultType : "FAIL",
      error : {errorCode,reason,data},
      success : null,
    })
  }
  next();
})

app.use(cors());                            // cors 방식 허용
app.use(morgan("dev"));                      // 모든 요청 로그 출력
app.use(cookieParser());                     // 쿠키 파싱

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

//회원가입 요청 처리
app.post("/api/v1/users/signup", handleUserSignUp);

//특정 지역에 레스토랑 추가
app.post("/api/v1/regions/:regionID/restaurants", handleRestaurantSignUp);

//레스토랑에 리뷰 추가
app.post("/api/v1/restaurants/review", handleReviewSignUp);

//사용자가 레스토랑의 특정 미션 도전
app.post("/api/v1/restaurants/:restaurantId/missions/:missionId/user-missions", handleUserMissionSignUp);

//레스토랑에 미션 추가
app.post("/api/v1/restaurants/:restaurantID/missions", handleMissionSignUp);

//레스토랑 리뷰목록 조회
app.get("/api/v1/restaurants/:restaurantId/reviews", handleListRestaurantReviews);

//사용자가 작성한 리뷰목록 조회
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);

//특정 가게 미션 목록 조회
app.get("/api/v1/restaurants/:restaurantId/missions", handleListRestaurantMissions);

//사용자가 진행중인 미션 목록
app.get("/api/v1/users/:userId/missions", handleListUserMissions);

//사용자가 진행중인 미션을 완료로 바꾸기
app.patch("/api/v1/users/:userId/missions/:missionId/complete-mission", handleCompleteUserMission);

app.use(express.static('public'));          // 정적 파일 접근

app.use((err, req, res, next) => {
  if(res.headerSent) {
    return next(err)
  }

  res.status(err.statusCode || 500).error({
    errorCode : err.errorCode || "unknown",
    reason : err.reason || err.message || null,
    data : err.data || null,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});