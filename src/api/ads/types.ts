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
