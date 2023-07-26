import express from "express";
import fs from "fs";
import validator from "../../utils/validator";
const router = express.Router();

const readFilePromise = (dataPath: string) => {
  return new Promise((reslove, reject) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) reject(err);
      else reslove(JSON.parse(data));
    });
  });
};

router.get("/page", (req: any, res: any) => {
  res.render("dramas.html");
});

// .use -> request 100% 會經過的 Middleware
router.use(validator.isTokenExist, validator.isTokenValid);

// [Work 1] 檢查參數
// [Work 3] 使用共用的Middleware (實名Middleware)
// GET /dramas/getDramaListData
router.get(
  "/list",
  // 1. 檢查 type 參數是否存在
  (req, res, next) => {
    // 調整status_code = 400 --> 前端接到，才會進到error區的程式
    if (!req.query.type) res.status(400).json({ message: "type未帶" });
    else next();
  },
  // 2. 檢查 type 參數是否正確
  (req: any, res, next) => {
    const data = ["犯罪", "殭屍", "愛情", "政治", "其他", "全"];
    if (!data.includes(req.query.type))
      res.status(400).json({ message: "參數錯誤" });
    else next();
  },
  async (req: any, res: any) => {
    // 最後的Middle Ware 處理 (業務邏輯)
    const { type } = req.query;
    try {
      const data: any = await readFilePromise("./20230719/models/sample2.json");
      const newData =
        type === "全"
          ? data
          : data.filter((detail: any) => detail.category === type);
      console.log(newData);
      res.json({ result: newData });
    } catch (err) {
      res.status(500).json({ message: "系統有問題" });
    }
  }
);

// [Work 2] 加入 API token 檢查機制，預期使用者 token 寫在 headers 上面
// POST
router.post(
  "/data",
  // 1. 檢查 headers 上是否有 token (M1)
  // (req, res, next) => {
  //   // 檢查 headers -> req.headers
  //   if (!req.headers["x-mars-token"])
  //     res.status(400).json({ message: "token 不存在" });
  //   else next();
  // },
  // 2. 檢查 token 值是否正確 (M2)
  // (req: any, res, next) => {
  //   if (req.headers["x-mars-token"] !== "APTX4869")
  //     res.status(403).json({ message: "無權限" });
  //   else next();
  // },
  // 3. 處理業務邏輯 (M3)
  async (req: any, res: any) => {
    // router.post("/createNewDramaData", async (req: any, res: any) => {
    // 取得前端傳來的form data資料
    const payload = req.body;
    try {
      // 將form data資料寫入 sample2.json
      // 1. 先讀出此 Array
      const data: any = await readFilePromise("./20230719/models/sample2.json");
      // 2. 使用push
      data.push(payload);
      // 3. 再把資料寫出去 sample.json (同步處理)
      fs.writeFileSync(
        "./20230719/models/sample2.json",
        JSON.stringify(data),
        "utf8"
      );

      res.send({ message: "OK" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "error", err });
    }
  }
);

export = router;
