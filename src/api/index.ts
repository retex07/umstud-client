import { ApiUser, ApiAuth, ApiOrder, ApiChat } from "./handlers";
import { Api, ExtraArguments } from "./types";

export function configureAPI(): Omit<ExtraArguments, "history"> {
  const api: Api = {
    user: ApiUser(),
    auth: ApiAuth(),
    order: ApiOrder(),
    chat: ApiChat(),
  };

  return { api };
}
