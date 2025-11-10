import { pool } from "../db.config.js";

// 사용자 미션 도전 추가
export const addUserMission = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, '진행중');`,
            [data.userId, data.missionId]
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

// 사용자 미션 도전 조회
export const getUserMission = async (userMissionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `SELECT * FROM user_mission WHERE id = ?;`,
            [userMissionId]
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

// 이미 도전 중인지 확인
export const checkUserMissionExists = async (userId, missionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?;`,
            [userId, missionId]
        );
        return result.length > 0; // true면 이미 도전 중, false면 도전하지 않음
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};
