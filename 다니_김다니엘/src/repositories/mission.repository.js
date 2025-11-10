import { pool } from "../db.config.js";

// 미션 추가
export const addMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO mission (restaurant_id, name, content, is_active, reward) VALUES (?, ?, ?, ?, ?);`,
            [data.restaurantId, data.name, data.content, data.isActive, data.reward]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
        );
    } finally {
        conn.release();
    }
};

// 미션 조회
export const getMission = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `SELECT * FROM mission WHERE id = ?;`,
            [missionId]
        );
        if (result.length == 0) {
            return null;
        }
        return result[0];
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
