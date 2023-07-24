// Express 設定模板引擎(View engine)

import express from "express";
import hbs from "hbs";
import path from "path";
import bodyParser from "body-parser";
import dramaRouter from "./application/router/drama";
import aboutRouter from "./application/router/about";
const app = express();
const portNum = 8088;

// [Views][1]設定模板引擎 (解析html 檔，讓 express 看懂html檔)
// hbs -> handlebars 為一種模板引擎
// 另外一種熱門的 -> pug
app.engine("html", hbs.__express);

// [Views][2]設定模板(template)位置
app.set("views", path.join(__dirname, "application", "views"));

// [Views][3]設定靜態檔案的位置 (讀取*.css/ *.js / *.jpg / *.png / *.mp4 / ...)
// -> 處理靜態檔相關的 requests
app.use(express.static(path.join(__dirname, "application")));

// 使express 可以解析 form data
// [body-parser][1] 解析 application/json
app.use(bodyParser.json());

// [body-parser][2] 解析 application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "1mb",
    parameterLimit: 10000,
  })
);

app.get("/", (req: any, res: any) => {
  // res.send("嗨嗨,  我是 Node.js server.");
  // [4]使用 .render (渲染) 回傳html介面
  res.render("index.html");
});

app.use("/dramas", dramaRouter);
app.use("/about", aboutRouter);

app.get("/test", (req: any, res: any) => {
  res.render("template.html");
});

app.get("/about", (req: any, res: any) => {
  res.render("aboutus.html");
});

app.listen(portNum, () => {
  console.log(`Server is running at localhost:${portNum}`);
});
