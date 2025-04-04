import { ApiUser, ApiAuth, ApiOrder } from "./handlers";
import { Api, ExtraArguments } from "./types";

export function configureAPI(): Omit<ExtraArguments, "history"> {
  const api: Api = {
    user: ApiUser(),
    auth: ApiAuth(),
    order: ApiOrder(),
  };

  return { api };
}
