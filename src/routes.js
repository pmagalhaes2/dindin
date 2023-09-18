const express = require("express");
const { createUser } = require("./controllers/UserController");

const router = express();

router.post('/usuario', createUser)

module.exports = { router };
