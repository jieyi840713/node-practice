import express from "express";
import fs from "fs";
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

// POST
router.post("/data", async (req: any, res: any) => {});

export = router;
