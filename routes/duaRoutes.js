const { duaController } = require("../controllers/duaController");
const express = require("express");
const router = express.Router();
router.get("/:id", duaController);

module.exports = router;
