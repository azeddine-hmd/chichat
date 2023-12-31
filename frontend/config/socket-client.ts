import { io } from "socket.io-client";

export type ConnectSocket = {
  onReady: () => void;
  onDisconnect: () => void;
};

export function connectSocket({ onReady, onDisconnect }: ConnectSocket) {
  return new Promise((resolve) => {
    window.clientSocket = io(process.env.NEXT_PUBLIC_BACKEND_DOMAIN as string, {
      transports: ["websocket"],
      withCredentials: true,
    });
    window.clientSocket.on("connect", () => {
      window.clientSocket.once("ready", (...args) => {
        resolve(window.clientSocket);
        setTimeout(() => onReady(), 1_500);
      });
    });
    window.clientSocket.on("disconnect", () => {
      onDisconnect();
    });
  });
}
