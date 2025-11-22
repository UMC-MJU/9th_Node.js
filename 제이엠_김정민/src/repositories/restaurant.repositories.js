import { prisma } from "../db.config.js";
import {
  DuplicateRestaurantNameError,
  RestaurantRequiredFieldsError,
} from "../error/Error.js";

export const createRestaurantWithAddress = async (data) => {
  // province/district가 있으면 해당 region을 upsert, 없으면 regionId 사용
  const result = await prisma.$transaction(async (tx) => {
    // 가게 이름 중복 방지 (사전 검사)
    const dup = await tx.restaurant.findFirst({
      where: { name: data.name },
      select: { id: true },
    });
    if (dup) {
      // throw new Error("이미 존재하는 가게 이름입니다.");
      throw new DuplicateRestaurantNameError(
        "이미 존재하는 가게 이름입니다.",
        data.name
      );
    }

    let regionId = null;
    const hasProvince =
      typeof data.province === "string" && data.province.trim().length > 0;
    const hasDistrict =
      typeof data.district === "string" && data.district.trim().length > 0;

    if (hasProvince && hasDistrict) {
      const normalizedProvince = data.province.trim();
      const normalizedDistrict = data.district.trim();
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
      regionId = region.id;
    } else if (data.regionId != null) {
      const found = await tx.region.findUnique({
        where: { id: Number(data.regionId) },
        select: { id: true },
      });
      if (!found) {
        throw new Error("존재하지 않는 지역입니다.");
      }
      regionId = found.id;
    } else {
      // throw new Error("regionId 또는 province/district가 필요합니다.");
      throw new RestaurantRequiredFieldsError(
        "regionId 또는 province/district가 필요합니다.",
        data.name
      );
    }

    const address = await tx.address.create({
      data: {
        detail_address: data.detailAddress || "",
        region_id: regionId,
      },
      select: { id: true },
    });

    const restaurant = await tx.restaurant.create({
      data: {
        address_id: address.id,
        name: data.name,
      },
      select: { id: true },
    });

    return { restaurantId: restaurant.id, addressId: address.id };
  });

  return result;
};

export const getRestaurantById = async (restaurantId) => {
  const row = await prisma.restaurant.findUnique({
    where: { id: Number(restaurantId) },
    select: {
      id: true,
      address_id: true,
      name: true,
      address: {
        select: {
          detail_address: true,
          region_id: true,
          region: { select: { province: true, district: true } },
        },
      },
    },
  });
  if (!row) return null;
  return {
    id: row.id,
    address_id: row.address_id,
    name: row.name,
    detail_address: row.address?.detail_address ?? null,
    region_id: row.address?.region_id ?? null,
    province: row.address?.region?.province ?? null,
    district: row.address?.region?.district ?? null,
  };
};

// 리뷰 관련 조회는 review.repositories로 이동했습니다.
