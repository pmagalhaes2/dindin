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
  registerTransaction,
  updateTransaction,
  deleteTransaction,
} = require("./controllers/TransactionController");
const { listCategories } = require("./controllers/CategoryController");
const { validateUser } = require("./middlewares/authentication");
const {
  validateUserDataFields,
  validateEmailAndPasswordFields,
} = require("./middlewares/validateUserData");
const {
  validateTransactionDataFields,
} = require("./middlewares/validateTransactionData");

const router = express();

router.post("/usuario", validateUserDataFields, createUser);
router.post("/login", validateEmailAndPasswordFields, login);

router.use(validateUser);

router.get("/usuario", detailUser);
router.put("/usuario", validateUserDataFields, updateUser);

router.get("/categoria", listCategories);

router.get("/transacao", listTransaction);
router.get("/transacao/:id", getTransactionById);
router.post("/transacao", validateTransactionDataFields, registerTransaction);
router.put("/transacao/:id", validateTransactionDataFields, updateTransaction);
router.delete("/transacao/:id", deleteTransaction);

module.exports = { router };
