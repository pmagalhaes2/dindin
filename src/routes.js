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
  listTransactionStatment,
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
const schemaTransaction = require("./schemas/schemaTransaction");
const schemaUserDataFields = require("./schemas/schemaUserDataFields");
const schemaEmailAndPasswordFiels = require("./schemas/schemaEmailAndPasswordFields");

const router = express();

router.post(
  "/usuario",
  validateUserDataFields(schemaUserDataFields),
  createUser
);
router.post(
  "/login",
  validateEmailAndPasswordFields(schemaEmailAndPasswordFiels),
  login
);

router.use(validateUser);

router.get("/usuario", detailUser);
router.put(
  "/usuario",
  validateUserDataFields(schemaUserDataFields),
  updateUser
);

router.get("/categoria", listCategories);

router.get("/transacao", listTransaction);
router.get("/transacao/extrato", listTransactionStatment);
router.get("/transacao/:id", getTransactionById);
router.post(
  "/transacao",
  validateTransactionDataFields(schemaTransaction),
  registerTransaction
);
router.put(
  "/transacao/:id",
  validateTransactionDataFields(schemaTransaction),
  updateTransaction
);
router.delete("/transacao/:id", deleteTransaction);

module.exports = { router };
