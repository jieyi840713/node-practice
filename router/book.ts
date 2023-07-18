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
  // 檔案系統的I/O ==> 非同步的動作(asynchronous)
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

router.get("/multi-data", (req, res) => {
  // 讀 modules/data${n}.json資料
  const result: any = {};
  fs.readFile("./modules/data1.json", "utf8", (err, data1) => {
    fs.readFile("./modules/data2.json", "utf8", (err, data2) => {
      fs.readFile("./modules/data3.json", "utf8", (err, data3) => {
        fs.readFile("./modules/data4.json", "utf8", (err, data4) => {
          fs.readFile("./modules/data5.json", "utf8", (err, data5) => {
            result["data1"] = JSON.parse(data1);
            result["data2"] = JSON.parse(data2);
            result["data3"] = JSON.parse(data3);
            result["data4"] = JSON.parse(data4);
            result["data5"] = JSON.parse(data5);
            res.json(result);
          });
        });
      });
    });
  });
});

// [module][1]講router導出，等著別人require引入使用
export = router;
