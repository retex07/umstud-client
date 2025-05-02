export type UserStars = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  slug: string;
  photo?: string | null;
  average_rating: number;
  completed_ads_count: number;
};
