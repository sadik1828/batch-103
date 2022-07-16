const express = require("express");
const userController = require("../Controllers/userControllers");
const router = express.Router();


router.route("/signup").post(userController.singUp);
router.route("/login").post(userController.login);
router.route("/changepassword").put(userController.changePassword);


module.exports = router;