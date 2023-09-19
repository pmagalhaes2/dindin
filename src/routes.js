const express = require("express");
const {
  createUser,
  login,
  detailUser,
  updateUser,
} = require("./controllers/UserController");
const { validateUser } = require("./middlewares/authentication");
const { listCategories } = require("./controllers/CategoryController");
const { validateUserDataFields, validateEmailAndPasswordFields } = require("./middlewares/validateUserData");

const router = express();

router.post("/usuario", validateUserDataFields, createUser);
router.post("/login", validateEmailAndPasswordFields, login);

router.use(validateUser);

router.get("/usuario", detailUser);
router.put("/usuario", validateUserDataFields, updateUser);

router.get("/categoria", listCategories);

module.exports = { router };
