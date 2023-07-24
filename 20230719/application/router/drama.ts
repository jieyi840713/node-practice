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
router.get("/getDramaListData", async (req: any, res: any) => {
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
router.post("/createNewDramaData", async (req: any, res: any) => {
  const createData = req.body;
  console.log(req);
  console.log(req.body);
  try {
    res.send({ message: "OK" });
  } catch (err) {
    res.send({ message: "error" });
  }
});

export = router;
