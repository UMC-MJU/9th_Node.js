import { StatusCodes } from "http-status-codes";
import { bodyToRestaurant } from "../dtos/restaurant.dtos.js";
import { restaurantSignUp, listRestaurantReviews,listRestaurantMissions} from "../services/restaurant.service.js";

export const handleRestaurantSignUp = async (req, res, next) => {
    const restaurantData = bodyToRestaurant(req.body)
    const result = await restaurantSignUp(parseInt(req.params.regionID), restaurantData)
    res.status(StatusCodes.OK).success(result)
    // try {
    //     console.log("레스토랑 추가를 요청했습니다!");
    //     console.log("body:", req.body);
    //     console.log("body 타입:", typeof req.body);
    //     console.log("regionID:", req.params.regionID);
        
    //     // body가 비어있는지 확인
    //     if (!req.body || Object.keys(req.body).length === 0) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ error: "요청 body가 비어있습니다." });
    //     }
        
    //     const regionID = parseInt(req.params.regionID); // URL 파라미터에서 받기 (숫자로 변환)
    //     if (isNaN(regionID)) {
    //         return res.status(StatusCodes.BAD_REQUEST).json({ error: "올바른 regionID를 입력해주세요." });
    //     }
        
    //     const restaurantData = bodyToRestaurant(req.body);
    //     console.log("변환된 데이터:", restaurantData);
        
    //     const restaurant = await restaurantSignUp(regionID, restaurantData);
    //     res.status(StatusCodes.OK).json({ result: restaurant });
    // } catch (err) {
    //     console.error("에러 발생:", err);
    //     console.error("에러 스택:", err.stack);
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}

export const handleListRestaurantReviews = async (req, res, next) => {
    const result = await listRestaurantReviews(
        parseInt(req.params.restaurantId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(result);
    // try {
    //     const reviews = await listRestaurantReviews(
    //         parseInt(req.params.restaurantId),
    //         typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    //     );
    //     res.status(StatusCodes.OK).json({ result: reviews });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}

export const handleListRestaurantMissions = async (req, res, next) => {
    const result = await listRestaurantMissions(
        parseInt(req.params.restaurantId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(result);
    // try {
    //     const missions = await listRestaurantMissions(
    //         parseInt(req.params.restaurantId),
    //         typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    //     );
    //     res.status(StatusCodes.OK).json({ result: missions });
    // } catch (err) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    // }
}