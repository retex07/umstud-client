import { History } from "history";

import { adminSymbol } from "@/constants/config";
import urls from "@/services/router/urls";

export function infoUser({
  is_staff,
  isFull,
  last_name,
  first_name,
  patronymic,
  is_superuser,
}: {
  is_staff?: boolean;
  is_superuser?: boolean;
  patronymic?: string | null;
  last_name: string;
  first_name: string;
  isFull?: boolean;
}): string {
  function addSymbol() {
    return ((is_staff || is_superuser) && adminSymbol) || "";
  }

  if (isFull) {
    return `${last_name} ${first_name} ${patronymic || ""} ${addSymbol()}`;
  }

  return `${last_name || ""} ${first_name || ""} ${addSymbol()}`;
}

export function checkToken(token: string | null = "", history: History) {
  if (!token) {
    history.push(urls.auth.index + urls.auth.signIn);
  }
}

export function goToUserProfile(slug: string, history: History) {
  if (!!slug && history) {
    history.push(
      urls.profile.index + urls.profile.item.replace(":profileId", slug)
    );
  }
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
