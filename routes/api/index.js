const express = require("express");
const router = express.Router();

//var a = ["/users", "/songs"];
//router.use(a, require("./"));

router.use("/users", require("./users"));
router.use("/songs", require("./songs"));

module.exports = router;
