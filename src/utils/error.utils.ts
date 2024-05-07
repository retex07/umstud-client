import toast from "react-hot-toast";

export function NotificationError(statusCode: number, msg?: string | null) {
  switch (true) {
    case statusCode === 401:
      toast.error(`${statusCode} ${msg || "Unauthorized request"}`);
      break;
    case statusCode === 403:
      toast.error(`${statusCode} ${msg || "Permissions error"}`);
      break;
    case statusCode === 502:
      toast.error(`${statusCode} The server is temporarily unavailable`);
      break;
    case statusCode >= 500 && statusCode !== 502:
      toast.error(`${statusCode} International server error`);
      break;
    default:
      return;
  }
}
