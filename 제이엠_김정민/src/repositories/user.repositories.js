import { prisma } from "../db.config.js";

// User 데이터 삽입 (region -> address -> user) 트랜잭션
export const addUser = async (data) => {
  try {
    // 중복 이메일 확인 (있으면 null 반환 - 기존 동작 유지)
    const exists = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (exists) return null;

    const createdUserId = await prisma.$transaction(async (tx) => {
      // 1) region 찾거나 생성 (정규화 + 복합 유니크 기반 upsert)
      const normalizedProvince = String(data.province || "").trim();
      const normalizedDistrict = String(data.district || "").trim();
      const region = await tx.region.upsert({
        where: {
          province_district: {
            province: normalizedProvince,
            district: normalizedDistrict,
          },
        },
        update: {},
        create: { province: normalizedProvince, district: normalizedDistrict },
        select: { id: true },
      });
      const regionId = region.id;

      // 2) address 생성
      const address = await tx.address.create({
        data: {
          detail_address: data.detailAddress || "",
          region_id: regionId,
        },
        select: { id: true },
      });

      // 3) user 생성
      const now = new Date();
      const birthDate = new Date(data.birth);
      const user = await tx.user.create({
        data: {
          address_id: address.id,
          email: data.email,
          phone_number: data.phoneNumber ?? null,
          name: data.name,
          gender: data.gender,
          birth: birthDate,
          create_at: now,
          update_at: now,
          password: data.passwordHash,
        },
        select: { id: true },
      });

      return user.id;
    });

    return createdUserId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) return null;
    return [user];
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 음식 선호 카테고리 매핑
export const setFavoriteFood = async (userId, foodCategoryId) => {
  try {
    await prisma.user_favor_category.create({
      data: {
        user_id: Number(userId),
        food_category_id: Number(foodCategoryId),
      },
    });
    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

// 사용자 선호 카테고리 반환
export const getUserFavoriteFoodsByUserId = async (userId) => {
  try {
    const maps = await prisma.user_favor_category.findMany({
      where: { user_id: Number(userId) },
      orderBy: { food_category_id: "asc" },
      select: { user_id: true, food_category_id: true },
    });

    if (maps.length === 0) return [];

    const foodIds = maps.map((m) => m.food_category_id);
    const categories = await prisma.food_category.findMany({
      where: { id: { in: foodIds } },
      select: { id: true, food_type: true },
    });
    const idToName = new Map(categories.map((c) => [c.id, c.food_type]));

    return maps.map((m) => ({
      food_category_id: m.food_category_id,
      user_id: m.user_id,
      name: idToName.get(m.food_category_id) || null,
    }));
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};
