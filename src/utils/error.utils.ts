import toast from "react-hot-toast";

export function NotificationError(statusCode: number, msg?: string | null) {
  switch (true) {
    case statusCode === 403:
      toast.error(`${statusCode} ${msg || "Permissions error"}`);
      break;
    case statusCode >= 500:
      toast.error(`${statusCode} International server error`);
      break;
    default:
      return;
  }
}
