import { adminSymbol } from "constants/config";

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

  return `${first_name || ""} ${last_name || ""} ${addSymbol()}`;
}
