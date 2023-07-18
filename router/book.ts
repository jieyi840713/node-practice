import express from "express";
import fs from "fs"; //  File system ， 是Node.js 原生套件之一
const router = express.Router(); // 產生router 物件，存入變數

// 路徑設定 / API 設定

router.get("/", (req, res) => {
  res.send("我是book的跟路徑");
});

router.get("/page", (req, res) => {
  res.json({ message: "我是/book/page 的路徑" });
});

router.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    // err -> 錯誤資料 ， data -> 讀取資料
    // 若有錯誤，通常沒事err 為unddfined
    if (err) {
      console.log(err);
      return res.send("檔案有問題");
    }

    console.log(data);
    console.log(typeof data); // 檢查資料型別
    const result = JSON.parse(data); // 將資料轉成JSON
    console.log(result);

    res.json(result); // 回傳前端JSON資料
    // res.send(data); // 回傳前端string資料
  });
});

router.get("/data-2", (req, res) => {
  const data2 = fs.readFile("data.json", "utf8", () => {}); // 會得到undefined
  console.log(data2);
  res.send(data2);
});

// [module][1]講router導出，等著別人require引入使用
export = router;
