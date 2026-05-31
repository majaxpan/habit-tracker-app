const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { getEntries, getTodaysEntries, createEntry, getEntriesByDate, editEntry } = require("../controllers/entryController");

router.get("/", authMiddleware, getEntriesByDate);
router.get("/all", authMiddleware, getEntries);
router.get("/today", authMiddleware, getTodaysEntries);
router.post("/", authMiddleware, createEntry);
router.put("/:entryId", authMiddleware, editEntry);

module.exports = router;