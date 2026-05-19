const pool = require("../db");

const getEntries = async (req, res) => {
    const result = await pool.query("SELECT id, habit_id, entry_date::text, value FROM habit_entries ORDER BY id ASC");
    res.json(result.rows);
};

const getTodaysEntries = async (req, res) => {
    const result = await pool.query("SELECT id, habit_id, entry_date::text, value FROM habit_entries WHERE entry_date::date = CURRENT_DATE ORDER BY id ASC");
    res.json(result.rows);
};

const createEntry = async (req, res) => {
    const { habitId, value} = req.body;

    const result = await pool.query(
        'INSERT INTO habit_entries (habit_id, entry_date, value) VALUES ($1, CURRENT_DATE, $2) RETURNING *',
        [habitId, value]
    );

    res.status(201).json(result.rows[0]);
};

module.exports = {
    getEntries,
    getTodaysEntries,
    createEntry
};