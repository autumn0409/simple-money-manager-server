const express = require("express");

const router = express.Router();

const recordController = require("../controllers/record");

// GET
router.get("", recordController.getRecords);

// POST
router.post("", recordController.createRecord);

// PUT
router.put("", recordController.editRecord);

// DELETE
router.delete("/:id", recordController.deleteRecord);

module.exports = router;
