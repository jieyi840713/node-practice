// Express 設定模板引擎(View engine)

import express from "express";
import hbs from "hbs";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import dramaRouter from "./application/router/drama";
import aboutRouter from "./application/router/about";
import authRouter from "./application/router/auth";
import validator from "./utils/validator";

// [Session 外存][1]
// 追加 redis 套件 (Node.js 使用)
// import { createClient } from "redis";
// const redisClient = createClient(); // 產生 redisClient 的連線實例 (Instance)

// [Session 外存][2]
// 追加 connect-redis 套件 (專門為express設計的對接套件)
// import connectRedis from "connect-redis";
// const redisStore = connectRedis(session);

const app = express();
const portNum = 8088;

// 設定模板引擎
app.engine("html", hbs.__express);
app.set("views", path.join(__dirname, "application", "views"));
app.use(express.static(path.join(__dirname, "application")));

// 處理 session 資料的 Middleware
// 後面才可以用req.session 做資料存取
app.use(
  session({
    secret: "cc90dis90#", // session 資料加密用
    resave: true, // 不論修改，是否要回存到store 上
    saveUninitialized: false, // 初始化的session，是否要存到stroe 上
    name: "_ntust_tutorial_id", // cookie 的 key 值
  })
);

// 使用body-parser 處理form-data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false, // 是否用額外套件解析字串
    limit: "1mb", // 限制參數資裡大小
    parameterLimit: 10000, // 限制參數個數
  })
);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

app.get("/", validator.isUserLogined, (req: any, res: any) => {
  // res.send("嗨嗨,  我是 Node.js server.");
  // [4]使用 .render (渲染) 回傳html介面
  res.render("index.html");
});

app.use("/dramas", validator.isUserLogined, dramaRouter);
app.use("/about", validator.isUserLogined, aboutRouter);
app.use("/auth", authRouter);
app.get("/about", (req: any, res: any) => {
  res.render("aboutus.html");
});

// 登入驗證
// 1. 加入login頁面
// 2. POST/auth API 驗證 + 紀錄資料到session 上
// 3. GET/logout 登出 API
app.get("/logout", (req: any, res) => {
  req.session.destroy();
  res.clearCookie("_ntust_tutorial_id");
  res.redirect("/login");
});
// 4. 加入登入驗證 middleware (isUserLogined)
app.get(
  "/login",
  (req: any, res, next) => {
    console.log(req.session.userInfo);
    if (!req.session.userInfo || !req.session.userInfo.isLogin)
      res.render("login.html");
    else next();
  },
  (req: any, res: any, next) => {
    res.redirect("/");
  }
);

app.listen(portNum, () => {
  console.log(`Server is running at localhost:${portNum}`);
});
