import { pool } from "../db.config.js";

export const findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM region WHERE id = ?", [id]);
  return rows[0];
};
