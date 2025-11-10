export const findByUnique = async (conn, missionId, userId, { forUpdate } = {}) => {
    const [rows] = await conn.query(
      `SELECT * FROM user_mission WHERE mission_id=? AND user_id=? ${forUpdate ? "FOR UPDATE" : ""}`,
      [missionId, userId]
    );
    return rows[0];
  };
  
  export const insert = async (conn, { missionId, userId, status }) => {
    await conn.query(
      "INSERT INTO user_mission (mission_id, user_id, status) VALUES (?,?,?)",
      [missionId, userId, status]
    );
  };
  
  export const updateStatus = async (conn, missionId, userId, status) => {
    await conn.query(
      "UPDATE user_mission SET status=?, updated_at=NOW(), completed_at=NULL WHERE mission_id=? AND user_id=?",
      [status, missionId, userId]
    );
  };
  