const express = require("express");
const { createUser, login } = require("./controllers/UserController");

const router = express();

router.post('/usuario', createUser)
router.post('/login', login)

module.exports = { router };
