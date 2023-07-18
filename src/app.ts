import express from "express";

const app = express();
const port = 3000;

// [module][2]引入 /router/bitcoin.ts 程式
import bookRouter from "../router/book";
import aboutRouter from "../router/about";

// 路由設定 / end-point 設定 / API設定
app.get("/", (req, res) => {
  res.send("the server is working");
});

// [module][3] 將 /bticoin 的 requebook 處理
app.use("/book", bookRouter);
app.use("/about", aboutRouter);

app.listen(port, () => {
  if (port === 3000) {
    console.log("true");
  }
  console.log(`server is listening on ${port}!!!`);
});
