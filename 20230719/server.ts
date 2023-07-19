// Express 設定模板引擎(View engine)

import express from "express";
import hbs from "hbs";
import path from "path";
const app = express();
const portNum = 8088;

// [1]設定模板引擎 (解析html 檔，讓 express 看懂html檔)
// hbs -> handlebars 為一種模板引擎
// 另外一種熱門的 -> pug
app.engine("html", hbs.__express);

// [2]設定模板(template)位置
app.set("views", path.join(__dirname, "application", "views"));

// [3]設定靜態檔案的位置 (讀取*.css/ *.js / *.jpg / *.png / *.mp4 / ...)
// -> 處理靜態檔相關的 requests
app.use(express.static(path.join(__dirname, "application")));

app.get("/", (req: any, res: any) => {
  // res.send("嗨嗨,  我是 Node.js server.");
  // [4]使用 .render (渲染) 回傳html介面
  res.render("index.html");
});

app.listen(portNum, () => {
  console.log(`Server is running at localhost:${portNum}`);
});
