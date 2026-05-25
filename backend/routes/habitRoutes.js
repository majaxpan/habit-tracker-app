const express = require("express");
const router = express.Router();

const {
  getHabits,
  createHabit,
  deleteHabit,
} = require("../controllers/habitController");

//GET /habits
//GET MAPPING
router.get("/", getHabits);

// POST /habits
router.post("/", createHabit);

//DELETE /habit
router.delete("/:habitId", deleteHabit);

module.exports = router;
