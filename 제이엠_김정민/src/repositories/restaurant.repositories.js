import { pool } from "../db.config.js";

export const regionExists = async (regionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT 1 FROM region WHERE id = ? LIMIT 1;`,
      [regionId]
    );
    return rows.length > 0;
  } finally {
    conn.release();
  }
};

export const createRestaurantWithAddress = async (data) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [addrInsert] = await conn.query(
      `INSERT INTO address (detail_address, region_id) VALUES (?, ?);`,
      [data.detailAddress || "", data.regionId]
    );
    const addressId = addrInsert.insertId;

    const [restInsert] = await conn.query(
      `INSERT INTO restaurant (address_id, name, point_reward) VALUES (?, ?, ?);`,
      [addressId, data.name, data.pointReward || 0]
    );
    const restaurantId = restInsert.insertId;

    await conn.commit();
    return { restaurantId, addressId };
  } catch (e) {
    try {
      await conn.rollback();
    } catch (_) {}
    throw e;
  } finally {
    conn.release();
  }
};

export const getRestaurantById = async (restaurantId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT r.id, r.address_id, r.name, r.point_reward,
              a.detail_address, a.region_id,
              rg.province, rg.district
         FROM restaurant r
         JOIN address a ON a.id = r.address_id
         JOIN region rg ON rg.id = a.region_id
        WHERE r.id = ?;`,
      [restaurantId]
    );
    return rows.length ? rows[0] : null;
  } finally {
    conn.release();
  }
};
