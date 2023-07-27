import express from "express";
import validator from "../../utils/validator";
const router = express.Router();

router.use(validator.isUserLogined);

router.get("/us", (req: any, res: any) => {
  res.render("aboutus.html");
});

export = router;
