const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();
router.use(bodyParser.json());

const categoryService = require("../services/categoryService");

// GET
router.get("", async (req, res) => {
  const { type } = req.query;
  try {
    const data = await categoryService.getCategories(type);
    res.status(200).json({ categories: data });
  } catch (err) {
    console.log(err);
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
    console.log(err);
    res.status(500).json(null);
  }
});

module.exports = router;
