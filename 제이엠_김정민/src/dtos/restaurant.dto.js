export const bodyToRestaurant = (params, body) => {
  const regionId = Number(params.regionId || body.regionId);
  return {
    regionId,
    name: body.name,
    pointReward: Number(body.pointReward ?? 0),
    detailAddress: body.detailAddress || "",
  };
};

export const responseFromRestaurant = (row) => {
  if (!row) return {};
  return {
    id: row.id,
    name: row.name,
    pointReward: row.point_reward,
    addressId: row.address_id,
    detailAddress: row.detail_address ?? null,
    region: row.region_id
      ? { id: row.region_id, province: row.province, district: row.district }
      : null,
  };
};
