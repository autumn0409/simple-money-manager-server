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
    res.json({ categories: data });
  } else {
    res.status(500);
  }
});

module.exports = router;
