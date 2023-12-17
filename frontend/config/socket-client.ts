import { io } from "socket.io-client";

export function connectSocket() {
  if (!window.clientSocket.connected) {
    window.clientSocket = io(process.env.NEXT_PUBLIC_BACKEND_DOMAIN as string, {
      transports: ["websocket"],
      withCredentials: true,
    });
  }
}
