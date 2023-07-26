// Express 設定模板引擎(View engine)

import express from "express";
import hbs from "hbs";
import path from "path";
import bodyParser from "body-parser";
import dramaRouter from "./application/router/drama";
import aboutRouter from "./application/router/about";
const app = express();
const portNum = 8088;

// 設定模板引擎
app.engine("html", hbs.__express);
app.set("views", path.join(__dirname, "application", "views"));
app.use(express.static(path.join(__dirname, "application")));

// 使用body-parser 處理form-data
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false, // 是否用額外套件解析字串
    limit: "1mb", // 限制參數資裡大小
    parameterLimit: 10000, // 限制參數個數
  })
);

app.get("/", (req: any, res: any) => {
  // res.send("嗨嗨,  我是 Node.js server.");
  // [4]使用 .render (渲染) 回傳html介面
  res.render("index.html");
});

app.use("/dramas", dramaRouter);
app.use("/about", aboutRouter);
app.get("/about", (req: any, res: any) => {
  res.render("aboutus.html");
});

app.get(
  "/hello",
  (req: any, res: any, next) => {
    // [1] 顯示前端name 參數
    console.log(`你好 ${req.query.name}`);
    // [2] MiddleWare 傳參數
    // req (request 物件) 上傳參數
    req.test = { name: "Mars", age: 28 };

    // [3] 往下一個 MiddleWare (中介函式) 執行
    // next();

    // [4] 檢查name 參數是否存在
    // V -> OK, 往下執行
    // X -> 傳回 {message: 'name 參數人呢'}
    if (req.query.name === undefined) res.send({ message: "name 參數人呢" });
    else next();
  },
  (req: any, res, next) => {
    // 100%確保name 參數存在
    console.log("我是middle Ware2");
    console.log(`你今年 ${req.query.age} 歲`);
    console.log(req.test);
    next();
  },
  (req, res, next) => {
    console.log("我是middle Ware3");
    next();
  },
  (req, res, next) => {
    res.send("Hello, Node.js gogo");
  }
);

app.listen(portNum, () => {
  console.log(`Server is running at localhost:${portNum}`);
});
