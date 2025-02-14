const express = require("express");
const router = express.Router();
const {
  getCategoriesWithSubcategoriesAndDuas,
} = require("../controllers/categoryController");

router.get("/", getCategoriesWithSubcategoriesAndDuas);

module.exports = router;
