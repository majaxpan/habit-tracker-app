const pool = require("../db");

const getHabits = async (req, res) => {
    const result = await pool.query("SELECT * FROM habits order by id ASC");
    res.json(result.rows);
};

const createHabit = async (req, res) => {
    const { name } = req.body;

    const result = await pool.query("INSERT INTO habits (name) VALUES ($1) RETURNING *", 
        [name]
    );

    res.status(201).json(result.rows[0]);
};

module.exports = { 
    getHabits,
    createHabit 
};