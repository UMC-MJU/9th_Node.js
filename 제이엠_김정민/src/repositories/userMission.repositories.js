import { pool } from "../db.config.js";

export const isUserMissionActive = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT 1 FROM user_mission WHERE user_id = ? AND mission_id = ? AND is_active = 1 LIMIT 1;`,
      [userId, missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const createUserMissionActive = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO user_mission (user_id, mission_id, is_active) VALUES (?, ?, 1);`,
      [userId, missionId]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const getUserMissionById = async (id) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT id, user_id, mission_id, is_active, created_at, completed_at FROM user_mission WHERE id = ?;`,
      [id]
    );
    return rows.length ? rows[0] : null;
  } finally {
    conn.release();
  }
};
