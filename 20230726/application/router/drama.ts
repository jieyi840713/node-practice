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
router.get("/list", async (req: any, res: any) => {
  // router.get("/getDramaListData", async (req: any, res: any) => { // API不佳
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
});

// POST
router.post("/data", async (req: any, res: any) => {
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
});

export = router;
