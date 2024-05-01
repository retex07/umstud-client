import toast from "react-hot-toast";

export function NotificationError(statusCode: number) {
  statusCode >= 500 && toast.error(`${statusCode} International server error`);
}
