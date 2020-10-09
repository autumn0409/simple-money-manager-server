const express = require("express");

const router = express.Router();

const chartController = require("../controllers/chart");

// GET
router.get("", chartController.getChart);

module.exports = router;
