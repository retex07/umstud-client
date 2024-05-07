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
  skills: Skill[];
  birth_date: string;
  description?: string;
  language?: string;
  photo: string | null;
  views: number;
  stars: number | null;
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

export type ChangePassword_RequestBody = {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
};

export type ChangePassword_ErrorBody = {
  old_password?: string[];
  new_password?: string[];
  new_password_confirm?: string[];
  non_field_errors?: string[];
};

export type CreateBlackList_ErrorBody = {
  blocked_user: string[];
};

export type CreateBlackList_RequestBody = {
  blocked_user: number;
};

export type CreateBlackList_Response = {
  message: string;
};

export type RemoveUserBlackList_ErrorBody = {
  detail: string;
};

export type RemoveUserBlackList_Response = CreateBlackList_Response;
