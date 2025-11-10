import { pool } from "../db.config.js";

export const insert = async ({ storeId, userId, rating, content }) => {
  const [res] = await pool.query(
    "INSERT INTO review (store_id, user_id, rating, content) VALUES (?,?,?,?)",
    [storeId, userId, rating, content]
  );
  return { id: res.insertId, storeId, userId, rating, content };
};
