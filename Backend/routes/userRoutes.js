const express = require("express");
const { getUsers, createUser } = require("../controllers/userController");

const router = express.Router();

router.get("/getUser", getUsers);
router.post("/createUser", createUser);

module.exports = router;