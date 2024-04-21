import { SelectOption } from "types/components";

export type Skill = {
  id: number;
  name: string;
};

export type DetailUserProfile = {
  username: string;
  slug: string;
  first_name: string;
  last_name: string;
  patronymic?: string;
  email: string;
  phone: string;
  place_study_work: string;
  skills: number[];
  birth_date: Date;
  description?: string;
  language?: string;
  photo: string | null;
  views: number;
  rating: number; //TODO: Исправить поле API
};

export type UserPut_RequestBody = Omit<
  DetailUserProfile,
  "username" | "slug" | "language" | "views" | "rating"
>;

export type UserPut_FormBody = Omit<UserPut_RequestBody, "skills"> & {
  skills: SelectOption[];
};

export type UserPut_Response = UserPut_RequestBody;

export type UserPut_ErrorBody = UserPut_RequestBody;
