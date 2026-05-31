const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getHabits,
  createHabit,
  deleteHabit,
} = require("../controllers/habitController");

//GET /habits
//GET MAPPING
router.get("/", authMiddleware, getHabits);

// POST /habits
router.post("/", authMiddleware, createHabit);

//DELETE /habit
router.delete("/:habitId", authMiddleware, deleteHabit);

module.exports = router;
