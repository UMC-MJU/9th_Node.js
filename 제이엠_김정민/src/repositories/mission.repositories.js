import { pool } from "../db.config.js";

export const missionExists = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT 1 FROM mission WHERE id = ? LIMIT 1;`,
      [missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const getMissionById = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT id, name, description, is_active, point_reward FROM mission WHERE id = ?;`,
      [missionId]
    );
    return rows.length ? rows[0] : null;
  } finally {
    conn.release();
  }
};

export const createMission = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (name, description, is_active, point_reward) VALUES (?, ?, ?, ?);`,
      [
        data.name,
        data.description,
        data.isActive ? 1 : 0,
        data.pointReward ?? 0,
      ]
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const restaurantMissionExists = async (restaurantId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT 1 FROM restaurant_mission_map WHERE restaurant_id = ? AND mission_id = ? LIMIT 1;`,
      [restaurantId, missionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const addRestaurantMission = async (restaurantId, missionId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `INSERT INTO restaurant_mission_map (restaurant_id, mission_id) VALUES (?, ?);`,
      [restaurantId, missionId]
    );
  } finally {
    conn.release();
  }
};
