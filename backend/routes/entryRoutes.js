const express = require("express");
const router = express.Router();

const { getEntries, getTodaysEntries, createEntry } = require("../controllers/entryController");

router.get("/", getEntries);
router.get("/today", getTodaysEntries);
router.post("/", createEntry);

module.exports = router;