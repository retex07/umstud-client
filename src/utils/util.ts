import i18next from "i18next";
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

export function dateWithMonthWord(
  dateString: string | undefined,
  separator = "."
) {
  if (!dateString) {
    return "";
  }

  const [day, month, year] = dateString.split(separator);

  if (/^(1[0-2]|[1-9])$/.test(month)) {
    return `${day} ${t("translation", {
      keyPrefix: `utils.dates.months.${month}`,
    })} ${year}`;
  }

  return `${day}.${month}.${year}`;
}

export function getFullDate(date: Date, withoutZero = true) {
  const prevDate = new Date(date);
  const symbolZero = withoutZero ? "0" : "";

  const d =
    prevDate.getDate().toString().length == 1
      ? symbolZero + prevDate.getDate().toString()
      : prevDate.getDate();
  const m =
    (prevDate.getMonth() + 1).toString().length == 1
      ? symbolZero + (prevDate.getMonth() + 1).toString()
      : prevDate.getMonth() + 1;
  const y = prevDate.getFullYear();

  return `${d}.${m}.${y}`;
}

export function getFullTime(date: Date): string {
  let hours = date.getHours().toString();
  let minutes = date.getMinutes().toString();

  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
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

export function t(
  namespace: string,
  { keyPrefix = "" }: { keyPrefix?: string }
) {
  if (!namespace) return "";

  if (!i18next.hasResourceBundle(i18next.language, namespace)) {
    i18next.loadNamespaces(namespace);
  }

  if (i18next.exists(keyPrefix, { ns: namespace })) {
    return i18next.t(keyPrefix, { ns: namespace });
  }

  return keyPrefix || namespace;
}

export function getShortPassedTime(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();

  const timeUnits = [
    { label: "year", ms: 1000 * 60 * 60 * 24 * 365 },
    { label: "month", ms: 1000 * 60 * 60 * 24 * 30 },
    { label: "day", ms: 1000 * 60 * 60 * 24 },
    { label: "hour", ms: 1000 * 60 * 60 },
    { label: "minute", ms: 1000 * 60 },
    { label: "second", ms: 1000 },
  ];

  for (const unit of timeUnits) {
    const value = Math.floor(diffMs / unit.ms);
    if (value >= 1) {
      return `${value}${t("translation", {
        keyPrefix: `utils.short.time.${unit.label}`,
      })}`;
    }
  }

  return `0${t("translation", {
    keyPrefix: `utils.short.time.second`,
  })}`;
}
