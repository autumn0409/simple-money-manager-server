const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const categoryService = require("../services/categoryService");

// GET
router.get("", async (req, res) => {
  const { type } = req.query;
  const data = await categoryService.getCategories(type);

  if (data !== null) {
    res.status(200).json({ categories: data });
  } else {
    res.status(500).json(null);
  }
});

// DELETE
router.delete("", async (req, res) => {
  const { type, name } = req.query;

  try {
    await categoryService.deleteCategory(type, name);
    res.status(200).json(null);
  } catch (err) {
    res.status(500).json(null);
  }
});

module.exports = router;
