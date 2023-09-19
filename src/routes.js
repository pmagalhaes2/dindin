const express = require("express");
const {
  createUser,
  login,
  detailUser,
  updateUser,
} = require("./controllers/UserController");
const { validateUser } = require("./middlewares/authentication");
const { listCategories } = require("./controllers/CategoryController");

const router = express();

router.post("/usuario", createUser);
router.post("/login", login);

router.use(validateUser);

router.get("/usuario", detailUser);
router.put("/usuario", updateUser);

router.get("/categoria", listCategories);

module.exports = { router };
