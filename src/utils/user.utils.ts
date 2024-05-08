import { adminSymbol } from "constants/config";

import { DetailUserProfile } from "api/user/types";

export function infoUser(user: DetailUserProfile, isFull = false): string {
  function addSymbol() {
    return ((user.is_staff || user.is_superuser) && adminSymbol) || "";
  }

  if (isFull) {
    return `${user.last_name || ""} ${user.first_name || ""} ${
      user.patronymic || ""
    } ${addSymbol()}`;
  }

  return `${user.first_name || ""} ${user.last_name || ""} ${addSymbol()}`;
}
