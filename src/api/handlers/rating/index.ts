import { ENDPOINTS_CONFIG } from "@/api/endpoints";
import { UserStars } from "@/api/handlers/rating/types";
import http from "@/api/http";

export type ApiRatingHandlers = {
  getRatingList: () => Promise<UserStars[]>;
};

const API = ENDPOINTS_CONFIG.api;

export default function ApiRating(): ApiRatingHandlers {
  const getRatingList: ApiRatingHandlers["getRatingList"] = async () => {
    return (await http.get(API.rating.list)).data;
  };

  return { getRatingList };
}
