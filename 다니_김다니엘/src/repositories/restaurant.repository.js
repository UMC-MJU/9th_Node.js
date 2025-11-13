
// region 존재 여부 확인
export const getRegion = async (regionId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `SELECT * FROM region WHERE id = ?;`,
            [regionId]
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

// 1. addRestaurant 함수 수정 - pool.query() 대신 conn.query() 사용
export const addRestaurant = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(  // pool.query → conn.query
            `INSERT INTO restaurant (name, address, cuisine_type, region_id) VALUES (?, ?, ?, ?);`,
            [data.name, data.address, data.cuisineType, data.regionId]
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

// 2. getRestaurant 함수 수정 - result 구조 확인 및 예외 처리
export const getRestaurant = async (restaurantId) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(  // pool.query → conn.query
            `SELECT * FROM restaurant WHERE id = ?;`,
            [restaurantId]
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
