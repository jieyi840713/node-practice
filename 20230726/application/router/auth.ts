import express from "express";
import validator from "../../utils/validator";
const router = express.Router();

router.post(
  "/",
  // 1. 檢查 account password 是否存在
  validator.isAccountAndPasswdExit,
  // 2. 再檢查 account passwod 是否和server 一致
  validator.isUserValid,
  // 3. 紀錄資料在 session 上面
  validator.setSessionInfo,
  // 4. response 回應前端
  (req, res) => {
    res.json({ message: "OK", redirect: "/" });
  }
);

export = router;
