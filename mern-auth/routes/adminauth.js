const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Admin-only route
router.get("/admin", auth, role(["admin"]), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

module.exports = router;
