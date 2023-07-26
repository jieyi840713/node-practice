const isTokenExist = (req: any, res: any, next: any) => {
  // 檢查 headers -> req.headers
  if (!req.headers["x-mars-token"])
    res.status(400).json({ message: "token 不存在" });
  else next();
};

const isTokenValid = (req: any, res: any, next: any) => {
  if (req.headers["x-mars-token"] !== "APTX4869")
    res.status(403).json({ message: "無權限" });
  else next();
};

export = {
  isTokenExist,
  isTokenValid,
};
