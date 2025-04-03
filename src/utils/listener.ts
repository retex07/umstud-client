import { RefObject } from "react";

export function menuListener(
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
  onHide: () => void
) {
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onHide();
    }
  }

  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}
