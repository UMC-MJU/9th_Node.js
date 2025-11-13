export const bodyToRestaurant = (body) => {
  const regionId = body.regionId != null ? Number(body.regionId) : null;
  return {
    regionId,
    province: body.province || null,
    district: body.district || null,
    name: body.name,
    detailAddress: body.detailAddress || "",
  };
};

export const responseFromRestaurant = (row) => {
  if (!row) return {};
  return {
    id: row.id,
    name: row.name,
    addressId: row.address_id,
    detailAddress: row.detail_address ?? null,
    region: row.region_id
      ? { id: row.region_id, province: row.province, district: row.district }
      : null,
  };
};
