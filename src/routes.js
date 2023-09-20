const express = require("express");
const {
  createUser,
  login,
  detailUser,
  updateUser,
} = require("./controllers/UserController");
const {
  listTransaction,
  getTransactionById,
  registerTransaction
} = require("./controllers/TransactionController");
const { listCategories } = require("./controllers/CategoryController");
const { validateUser } = require("./middlewares/authentication");
const { validateUserDataFields, validateEmailAndPasswordFields } = require("./middlewares/validateUserData");


const router = express();

router.post("/usuario", validateUserDataFields, createUser);
router.post("/login", validateEmailAndPasswordFields, login);

router.use(validateUser);

router.get("/usuario", detailUser);
router.put("/usuario", validateUserDataFields, updateUser);

router.get("/categoria", listCategories);

router.get("/transacao", listTransaction)
router.get('/transacao/:id', getTransactionById)
router.post("/transacao", registerTransaction)

module.exports = { router };
