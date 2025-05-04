import { getAccessToken } from "@/utils/user";
import { t } from "@/utils/util";

type MessageHandler = (event: MessageEvent) => void;
type ErrorHandler = (event: Event) => void;

export default class WebSocketService {
  private _socket: WebSocket | null = null;

  connect(
    url: string,
    onOpen?: () => void,
    onClose?: () => void,
    onError?: () => void
  ): void {
    const baseUrl = `${process.env.REACT_APP_WEBSOCKET_URL}${url}`;
    const fullUrl = `${baseUrl}?token=${getAccessToken()}`;
    this._socket = new WebSocket(fullUrl);

    this._socket.onopen = () => {
      console.log(
        t("translation", { keyPrefix: "websocket.onopen" }),
        "\nurl:",
        url
      );
      if (onOpen) {
        onOpen();
      }
    };

    this._socket.onclose = () => {
      console.log(
        t("translation", { keyPrefix: "websocket.onclose" }),
        "\nurl:",
        url
      );
      if (onClose) {
        onClose();
      }
    };

    this._socket.onerror = (error) => {
      console.error(
        t("translation", { keyPrefix: "websocket.onerror" }),
        error,
        "\nurl:",
        url
      );
      if (onError) {
        onError();
      }
    };
  }

  onMessage(handler: MessageHandler): void {
    if (this._socket) {
      this._socket.onmessage = handler;
    }
  }

  onError(handler: ErrorHandler): void {
    if (this._socket) {
      this._socket.onerror = handler;
    }
  }

  send<T>(message: T): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify(message));
    } else {
      console.error(t("translation", { keyPrefix: "websocket.send.error" }));
    }
  }

  close(): void {
    this._socket?.close();
  }
}
