const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category");

// GET
router.get("", categoryController.getCategories);

// POST
router.post("", categoryController.createCategory);

// DELETE
router.delete("", categoryController.deleteCategory);

module.exports = router;
