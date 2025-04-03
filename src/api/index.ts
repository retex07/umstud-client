import { ApiUser, ApiAuth } from "./handlers";
import { Api, ExtraArguments } from "./types";

export function configureAPI(): Omit<ExtraArguments, "history"> {
  const api: Api = {
    user: ApiUser(),
    auth: ApiAuth(),
  };

  return { api };
}
