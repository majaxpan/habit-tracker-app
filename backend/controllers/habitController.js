const pool = require("../db");

const getHabits = async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    "SELECT * FROM habits WHERE user_id=$1 ORDER BY id ASC",
    [userId],
  );

  res.json(result.rows);
};

const createHabit = async (req, res) => {
  const { name, type, unit } = req.body;
  const userId = req.user.userId;

  const result = await pool.query(
    "INSERT INTO habits (name, type, unit, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, type, unit, userId],
  );

  res.status(201).json(result.rows[0]);
};

const deleteHabit = async (req, res) => {
  const { habitId } = req.params;
  const userId = req.user.userId;

  const result = await pool.query(
    "DELETE FROM habits WHERE id = $1 and user_id= $2 RETURNING *",
    [habitId, userId],
  );

  res.json(result.rows[0]);
};

module.exports = {
  getHabits,
  createHabit,
  deleteHabit,
};
