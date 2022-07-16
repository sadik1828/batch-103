const express = require("express");
const menuController = require("../Controllers/menuControllers");
const router = express.Router();

router.route("/").post(menuController.create)
router.route("/:id").put(menuController.edit).delete(menuController.delete)




module.exports = router;