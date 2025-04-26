import { ApiUser, ApiAuth, ApiOrder, ApiChat, ApiForum } from "./handlers";
import { Api, ExtraArguments } from "./types";

export function configureAPI(): Omit<ExtraArguments, "history"> {
  const api: Api = {
    user: ApiUser(),
    auth: ApiAuth(),
    order: ApiOrder(),
    chat: ApiChat(),
    forum: ApiForum(),
  };

  return { api };
}
