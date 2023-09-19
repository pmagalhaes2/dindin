const express = require("express");
const {
  createUser,
  login,
  detailUser,
} = require("./controllers/UserController");
const { validateUser } = require("./middlewares/authentication");

const router = express();

router.post("/usuario", createUser);
router.post("/login", login);

router.use(validateUser);

router.get("/usuario", detailUser);

module.exports = { router };
