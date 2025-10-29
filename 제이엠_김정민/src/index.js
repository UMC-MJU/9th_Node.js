// const express = require('express')  // -> CommonJS
import dotenv from "dotenv";
import express from "express"; // -> ES Module
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controllers.js";

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

// 정해진 URL로 POST요청을 보내면 handleUserSignUp 함수가 실행됨.
// 오타 수정: singup -> signup
app.post("/api/v1/users/signup", handleUserSignUp);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
