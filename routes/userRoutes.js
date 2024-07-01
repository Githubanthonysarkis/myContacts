const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  getUsers,
  testUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/users", getUsers);

router.get("/current", validateToken, currentUser);

router.get("/test", testUser);
module.exports = router;
