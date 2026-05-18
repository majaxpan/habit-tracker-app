const express = require("express");
const router = express.Router();

const{ getHabits, createHabit } = require("../controllers/habitController");

//GET /habits
//GET MAPPING
router.get("/", getHabits);

// POST /habits
router.post("/", createHabit);

module.exports = router;