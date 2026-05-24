const pool = require("../db");

const getEntries = async (req, res) => {
  const result = await pool.query(
    "SELECT id, habit_id, entry_date::text, value FROM habit_entries ORDER BY id ASC",
  );
  res.json(result.rows);
};

const getTodaysEntries = async (req, res) => {
  const result = await pool.query(
    "SELECT id, habit_id, entry_date::text, value FROM habit_entries WHERE entry_date::date = CURRENT_DATE ORDER BY id ASC",
  );
  res.json(result.rows);
};

const getEntriesByDate = async (req, res) => {
  const { date } = req.query;
  const result = await pool.query(
    `SELECT id, habit_id, entry_date::text, value
   FROM habit_entries
   WHERE entry_date::date = $1::date
   ORDER BY id ASC`,
    [date],
  );
  res.json(result.rows);
};

const createEntry = async (req, res) => {
  const { habitId, value, date } = req.body;

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

  const result = await pool.query(
    `
    UPDATE habit_entries
    SET value = $1
    WHERE id = $2
    RETURNING id, habit_id, entry_date::text, value
    `,
    [value, entryId],
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
