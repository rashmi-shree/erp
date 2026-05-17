const pool = require("../db/db");

const getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name, department } = req.body;

    const result = await pool.query(
      `
      INSERT INTO employees(name, department)
      VALUES($1, $2)
      RETURNING *
      `,
      [name, department]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee
};