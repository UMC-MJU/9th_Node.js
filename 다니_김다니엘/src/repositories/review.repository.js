import { pool } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO review (restaurant_id, user_id, rating, content) VALUES (?, ?, ?, ?);`,
            [data.restaurantId, data.userId, data.rating, data.content]
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

// 리뷰 조회
export const getReview = async (reviewId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `SELECT * FROM review WHERE id = ?;`,
            [reviewId]
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
