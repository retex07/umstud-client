import { AxiosResponse } from "axios";
import { History } from "history";

import {
  ApiAuthHandlers,
  ApiUserHandlers,
  ApiOrderHandlers,
  ApiChatHandlers,
  ApiForumHandlers,
  ApiRatingHandlers,
} from "./handlers";

export type PureResponse<T = unknown> = Promise<AxiosResponse<T>>;

export interface Api {
  user: ApiUserHandlers;
  auth: ApiAuthHandlers;
  order: ApiOrderHandlers;
  chat: ApiChatHandlers;
  forum: ApiForumHandlers;
  rating: ApiRatingHandlers;
}

export interface ExtraArguments {
  api: Api;
  history: History;
}
