import { pool } from "../db.config.js";

// User 데이터 삽입 (region -> address -> user) 트랜잭션
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    // 이메일 중복 검사
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    await conn.beginTransaction();

    // 1) region 찾거나 생성
    // 동일한 (province, district) 존재 시 재사용
    const [regionRows] = await conn.query(
      `SELECT id FROM region WHERE province = ? AND district = ? LIMIT 1;`,
      [data.province, data.district]
    );

    let regionId;
    if (regionRows.length > 0) {
      regionId = regionRows[0].id;
    } else {
      const [regionInsert] = await conn.query(
        `INSERT INTO region (province, district) VALUES (?, ?);`,
        [data.province, data.district]
      );
      regionId = regionInsert.insertId;
    }

    // 2) address 생성 (정상 컬럼명 region_id 사용)
    const [addressInsert] = await conn.query(
      `INSERT INTO address (detail_address, region_id) VALUES (?, ?);`,
      [data.detailAddress || "", regionId]
    );
    const addressId = addressInsert.insertId;

    // 3) user 생성
    const updateAt = data.createAt; // 최초 생성 시 동일 시간으로 저장
    const [userInsert] = await conn.query(
      `INSERT INTO user (address_id, email, phone_number, name, gender, birth, create_at, update_at, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        addressId,
        data.email,
        data.phoneNumber || null,
        data.name,
        data.gender,
        data.birth,
        data.createAt,
        updateAt,
        null,
      ]
    );

    await conn.commit();
    return userInsert.insertId;
  } catch (err) {
    try {
      await conn.rollback();
    } catch (_) {}
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await conn.query(`SELECT * FROM user WHERE id = ?;`, [
      userId,
    ]);

    if (user.length === 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setFavoriteFood = async (userId, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await conn.query(
      `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
      [foodCategoryId, userId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserFavoriteFoodsByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [favoriteFood] = await conn.query(
      "SELECT ufc.food_category_id, ufc.user_id, fcl.food_type AS name " +
        "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
        "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
      [userId]
    );

    return favoriteFood;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
