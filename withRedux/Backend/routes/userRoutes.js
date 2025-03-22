const express = require("express");
const { getUsers, 
        createUser, 
        updateUser, 
        deleteUser, 
        getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/getUser", getUsers);
router.get("/getUser/:id", getUserById);
router.post("/createUser", createUser);
router.put("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;