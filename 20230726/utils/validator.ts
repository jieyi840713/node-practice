const isTokenExist = (req: any, res: any, next: any) => {
  // 檢查 headers -> req.headers
  console.log(req.headers);
  console.log(req.headers["x-mars-token"]);
  if (!req.headers["x-mars-token"])
    res.status(400).json({ message: "token 不存在" });
  else next();
};

const isTokenValid = (req: any, res: any, next: any) => {
  if (req.headers["x-mars-token"] !== "APTX4869")
    res.status(403).json({ message: "無權限" });
  else next();
};

const isAccountAndPasswdExit = (req: any, res: any, next: any) => {
  // 檢查 payload (form-data)
  const { account, passwd } = req.body;
  if (!account || !passwd) res.status(400).json({ message: "帳號或密碼 缺少" });
  else next();
};
const isUserValid = (req: any, res: any, next: any) => {
  const { account, passwd } = req.body;
  if (!(account === "mars" && passwd === "123"))
    res.status(400).json({ message: "帳號或密碼 錯誤" });
  else next();
};
const setSessionInfo = (req: any, res: any, next: any) => {
  // 紀錄資料在session 上面
  // 建立userInfo key-value pair
  req.session.userInfo = {
    name: "mars",
    isLogin: true,
  };

  next();
};

const isUserLogined = (req: any, res: any, next: any) => {
  if (!req.session.userInfo || !req.session.userInfo.isLogin)
    res.redirect("/login");
  else next();
};

export = {
  isTokenExist,
  isTokenValid,
  isAccountAndPasswdExit,
  isUserValid,
  setSessionInfo,
  isUserLogined,
};
