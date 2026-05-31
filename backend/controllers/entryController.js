const pool = require("../db");

const getEntries = async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    `
    SELECT he.id, he.habit_id, he.entry_date::text, he.value
    FROM habit_entries he
    JOIN habits h ON h.id = he.habit_id
    WHERE h.user_id = $1
    ORDER BY he.id ASC
    `,
    [userId],
  );
  res.json(result.rows);
};

const getTodaysEntries = async (req, res) => {
  const userId = req.user.userId;

  const result = await pool.query(
    `
    SELECT he.id, he.habit_id, he.entry_date::text, he.value
    FROM habit_entries he
    JOIN habits h ON h.id = he.habit_id
    WHERE h.user_id = $1
      AND he.entry_date::date = CURRENT_DATE
    ORDER BY he.id ASC
    `,
    [userId]
  );

  res.json(result.rows);
};

const getEntriesByDate = async (req, res) => {
  const { date } = req.query;
  const userId = req.user.userId;

  const result = await pool.query(
    `
    SELECT he.id, he.habit_id, he.entry_date::text, he.value
    FROM habit_entries he
    JOIN habits h ON h.id = he.habit_id
    WHERE h.user_id = $1
      AND he.entry_date::date = $2::date
    ORDER BY he.id ASC
    `,
    [userId, date],
  );
  res.json(result.rows);
};

const createEntry = async (req, res) => {
  const { habitId, value, date } = req.body;
  const userId = req.user.userId;

  const habitCheck = await pool.query(
    "SELECT id FROM habits WHERE id = $1 AND user_id = $2",
    [habitId, userId],
  );

  if (habitCheck.rows.length === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const result = await pool.query(
    `
    INSERT INTO habit_entries (habit_id, entry_date, value)
    VALUES ($1, $2::date, $3)
    ON CONFLICT (habit_id, entry_date)
    DO UPDATE SET value = EXCLUDED.value
    RETURNING id, habit_id, entry_date::text, value
    `,
    [habitId, date, value],
  );

  res.status(201).json(result.rows[0]);
};

const editEntry = async (req, res) => {
  const { entryId } = req.params;
  const { value } = req.body;
  const userId = req.user.userId;

  const result = await pool.query(
    `
    UPDATE habit_entries he
    SET value = $1
    FROM habits h
    WHERE he.id = $2
      AND he.habit_id = h.id
      AND h.user_id = $3
    RETURNING he.id, he.habit_id, he.entry_date::text, he.value
    `,
    [value, entryId, userId],
  );

  res.json(result.rows[0]);
};

module.exports = {
  getEntries,
  getTodaysEntries,
  getEntriesByDate,
  createEntry,
  editEntry,
};
