import { UserStars } from "@/api/handlers/rating/types";

export type StateRating = {
  isLoading: boolean;
  list: UserStars[];
};
