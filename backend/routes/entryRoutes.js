const express = require("express");
const router = express.Router();

const { getEntries, getTodaysEntries, createEntry, getEntriesByDate } = require("../controllers/entryController");

router.get("/", getEntriesByDate);
router.get("/all", getEntries);
router.get("/today", getTodaysEntries);
router.post("/", createEntry);

module.exports = router;