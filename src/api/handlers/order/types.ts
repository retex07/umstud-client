import { SelectOption } from "@/types/components";

export interface ExecutorBody {
  ad_id: number;
  response_id: number;
}

export type CardStatusTypes = "open" | "closed" | "in_progress" | "completed";

export interface UserResponse {
  id?: number;
  first_name: string;
  last_name: string;
  photo?: string;
  slug: string;
  patronymic?: string;
}

export interface CompletedAd_BodyRequest {
  count: number;
  message?: string;
}

export interface AdGet {
  id: number;
  orderNumber?: number;
  executor?: UserResponse;
  responders?: Respond[];
  title: string;
  type: string[];
  category: string[];
  status: CardStatusTypes;
  deadlineStartAt?: string;
  deadlineEndAt?: string;
  budget?: number;
  description: string;
  room_id?: string;
  author: UserResponse;
  files?: number[];
}

export interface AdCreate {
  id: number;
  title: string;
  type: number[];
  category: number[];
  deadlineEndAt: string;
  budget?: number;
  description: string;
}

export interface AdCreateResponse extends AdCreate {
  id: number;
}

export interface Respond {
  id: number;
  responder: UserResponse;
  comment?: string;
}

export interface RespondBody {
  ad_id: number;
  comment?: string;
}

export type AdCreate_FormBody = Omit<AdCreate, "category" | "type"> & {
  category: SelectOption;
  type: SelectOption;
};

export type ValidKeysCreate = keyof AdCreate;

export interface OptionSelect {
  id: number;
  name: string;
}
