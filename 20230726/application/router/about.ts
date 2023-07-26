import express from "express";
const router = express.Router();

router.get("/us", (req: any, res: any) => {
  res.render("aboutus.html");
});

export = router;
