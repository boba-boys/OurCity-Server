"use strict";
const router = require("express").Router();

router.use("/tags", require("./tags"));
router.use("/users", require("./users"));
router.use("/groups", require("./groups"));


router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
