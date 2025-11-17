import { StatusCodes } from "http-status-codes";
import { bodyToRestaurantMission } from "../dtos/mission.dto.js";
import { addMissionToRestaurant } from "../services/mission.service.js";

export const handleAddMissionToRestaurant = async (req, res) => {
  const data = bodyToRestaurantMission(req.params, req.body);
  const result = await addMissionToRestaurant(data);
  res.status(StatusCodes.OK).success(result);
  // try {
  //   const data = bodyToRestaurantMission(req.params, req.body);
  //   const result = await addMissionToRestaurant(data);
  //   res.status(StatusCodes.CREATED).json({ result });
  // } catch (err) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: err.message || "요청을 처리할 수 없습니다." });
  // }
};
