import { SelectOption } from "types/components";

export type CardStatusTypes = "open" | "closed" | "in_progress";

export interface UserResponse {
  id?: number;
  first_name: string;
  last_name: string;
  photo?: string;
  slug: string;
  patronymic?: string;
}

export interface AdGet {
  id: number;
  orderNumber?: number;
  responders?: UserResponse[];
  title: string;
  type: string[];
  category: string[];
  status: CardStatusTypes;
  deadlineStartAt?: string;
  deadlineEndAt?: string;
  budget: number;
  description: string;
  author: UserResponse;
  files?: number[];
}

export interface AdCreate {
  title: string;
  type: number[];
  category: number[];
  deadlineEndAt: string;
  budget: number;
  description: string;
}

export interface AdCreateResponse extends AdCreate {
  id: number;
}

export interface Respond {
  ad_id: number;
  comment?: string;
}

export type AdCreate_FormBody = Omit<AdCreate, "category" | "type"> & {
  category: SelectOption[];
  type: SelectOption[];
};

export type ValidKeysCreate = keyof AdCreate;

export interface OptionSelect {
  id: number;
  name: string;
}
