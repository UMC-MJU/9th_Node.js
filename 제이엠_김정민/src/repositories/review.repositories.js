import { pool } from "../db.config.js";

export const restaurantExists = async (restaurantId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT 1 FROM restaurant WHERE id = ? LIMIT 1;`,
      [restaurantId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const createReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const { userId, restaurantId, description, rating } = data;
    const [result] = await conn.query(
      `INSERT INTO review (user_id, restaurant_id, description, rating) VALUES (?, ?, ?, ?);`,
      [userId, restaurantId, description, rating]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const getReviewById = async (reviewId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT id, user_id, restaurant_id, description, created_at, rating FROM review WHERE id = ?;`,
      [reviewId]
    );
    return rows.length ? rows[0] : null;
  } finally {
    conn.release();
  }
};
