import * as regionRepo from "../repositories/region.repository.js";
import * as storeRepo from "../repositories/store.repository.js";

export const createStore = async (input) => {
  const region = await regionRepo.findById(input.regionId);
  if (!region) throw { status: 404, message: "존재하지 않는 지역입니다." };
  return await storeRepo.insert(input);
};
