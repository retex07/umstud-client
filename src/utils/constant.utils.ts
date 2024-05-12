import isFunction from "lodash/isFunction";
import toast from "react-hot-toast";

export function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const cleanDigits = digits.startsWith("8") ? "7" + digits.slice(1) : digits;
  return cleanDigits.replace(
    /^(7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
    "+$1 ($2) $3-$4-$5"
  );
}

export function isMobileVersion() {
  return window.innerWidth <= 1220;
}

export function splitKey(key: string) {
  return key.split("_").join("");
}

export function convertDate(
  dateString: string | undefined,
  reverse = false,
  separator = "-"
) {
  if (!dateString) {
    return "";
  }

  if (!reverse) {
    const [year, month, day] = dateString.split(separator);
    return `${day}.${month}.${year}`;
  } else {
    const [day, month, year] = dateString.split(separator);
    return `${year}-${month}-${day}`;
  }
}

export function getFullDate(date: Date) {
  const prevDate = new Date(date);

  const d =
    prevDate.getDate().toString().length == 1
      ? "0" + prevDate.getDate().toString()
      : prevDate.getDate();
  const m =
    (prevDate.getMonth() + 1).toString().length == 1
      ? "0" + (prevDate.getMonth() + 1).toString()
      : prevDate.getMonth();
  const y = prevDate.getFullYear();

  return `${d}.${m}.${y}`;
}

export async function copyTextToClipboard(
  text: string,
  onCopied?: () => void
): Promise<void> {
  try {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not available");
    }
    await navigator.clipboard.writeText(text);
    isFunction(onCopied) && onCopied();
  } catch (error) {
    toast.error("Failed to copy text: " + error);
  }
}
