import { SelectOption } from "@/types/components";

export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  file: string;
  uploaded_at: Date;
};

export type Skill = {
  id: number;
  name: string;
};

export type SimpleUserProfile = {
  id: number;
  slug: string;
  first_name: string;
  last_name: string;
  patronymic: string;
  photo: string;
};

export type DetailUserProfile = {
  id: number;
  username: string;
  slug: string;
  is_superuser: boolean;
  is_staff: boolean;
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
  portfolio_items: PortfolioItem[];
};

export type UserPut_RequestBody = Omit<
  DetailUserProfile,
  "username" | "slug" | "language" | "views" | "rating" | "portfolio_items"
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

export type BlackList = {
  id: number;
  blocked_user: SimpleUserProfile;
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

export type RemovePortfolioItem_ErrorBody = RemoveUserBlackList_ErrorBody;
export type RemovePortfolioItem_Response = CreateBlackList_Response;

export type PortfolioItem_Response = PortfolioItem;
export type PortfolioItem_ErrorBody = {
  title?: string[];
  description?: string[];
  file?: string[];
};
export type PortfolioItem_RequestBody = {
  title: string;
  description: string;
  file: File;
};
