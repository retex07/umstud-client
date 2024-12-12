type MessageHandler = (event: MessageEvent) => void;
type ErrorHandler = (event: Event) => void;

class WebSocketService {
  _socket: WebSocket | null = null;

  connect(url: string, token?: string): void {
    const baseUrl = `ws://${process.env.REACT_APP_SERVER_URL}/ws${url}`;
    const fullUrl = token ? `${baseUrl}?token=${token}` : `${baseUrl}`;
    this._socket = new WebSocket(fullUrl);

    this._socket.onopen = () =>
      console.log("WebSocket соединение установлено.");
    this._socket.onclose = () => console.log("WebSocket соединение закрыто.");
    this._socket.onerror = (error) => console.error("WebSocket ошибка:", error);
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

  send(message: any): void {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
      this._socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket не подключен или закрыт.");
    }
  }

  close(): void {
    this._socket?.close();
  }
}

export const webSocketService = new WebSocketService();
