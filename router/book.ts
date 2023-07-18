import express from "express";
const router = express.Router(); // 產生router 物件，存入變數

// 路徑設定 / API 設定

router.get("/", (req, res) => {
  res.send("我是book的跟路徑");
});

router.get("/page", (req, res) => {
  res.json({ message: "我是/book/page 的路徑" });
});

// [module][1]講router導出，等著別人require引入使用
export = router;
