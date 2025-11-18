import * as regionRepo from "../repositories/region.repository.js";
import * as storeRepo from "../repositories/store.repository.js";
import { NotFoundError } from "../errors.js";

export const createStore = async (input) => {
  const region = await regionRepo.findById(input.regionId);
  if (!region) throw new NotFoundError("지역", input.regionId);
  return await storeRepo.insert(input);
};
