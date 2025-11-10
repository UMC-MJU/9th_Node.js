import { pool } from "../db.config.js";

export const findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM store WHERE id = ?", [id]);
  return rows[0];
};

export const insert = async (input) => {
  const [res] = await pool.query(
    "INSERT INTO store (name, region_id, address, category, phone) VALUES (?,?,?,?,?)",
    [input.name, input.regionId, input.address, input.category, input.phone]
  );
  return { id: res.insertId, ...input };
};
