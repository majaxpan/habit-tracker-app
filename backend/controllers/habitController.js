const pool = require("../db");

const getHabits = async (req, res) => {
    const result = await pool.query("SELECT * FROM habits ORDER BY id ASC");
    res.json(result.rows);
};

const createHabit = async (req, res) => {
    const { name, type, unit } = req.body;

    const result = await pool.query(
        'INSERT INTO habits (name, type, unit) VALUES ($1, $2, $3) RETURNING *', 
        [name, type, unit]
    );

    res.status(201).json(result.rows[0]);
};

module.exports = { 
    getHabits,
    createHabit 
};