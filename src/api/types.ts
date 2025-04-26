import { AxiosResponse } from "axios";
import { History } from "history";

import {
  ApiAuthHandlers,
  ApiUserHandlers,
  ApiOrderHandlers,
  ApiChatHandlers,
  ApiForumHandlers,
} from "./handlers";

export type PureResponse<T = unknown> = Promise<AxiosResponse<T>>;

export interface Api {
  user: ApiUserHandlers;
  auth: ApiAuthHandlers;
  order: ApiOrderHandlers;
  chat: ApiChatHandlers;
  forum: ApiForumHandlers;
}

export interface ExtraArguments {
  api: Api;
  history: History;
}
