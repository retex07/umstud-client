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
