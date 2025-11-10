import { pool } from "../db.config.js";

export const findById = async (connOrNull, id) => {
  const exec = connOrNull ?? pool;
  const [rows] = await exec.query("SELECT * FROM mission WHERE id = ?", [id]);
  return rows[0];
};

export const insert = async ({ storeId, title, description, reward }) => {
  const [res] = await pool.query(
    "INSERT INTO mission (store_id, title, description, reward) VALUES (?,?,?,?)",
    [storeId, title, description, reward]
  );
  return { id: res.insertId, storeId, title, description, reward };
};
