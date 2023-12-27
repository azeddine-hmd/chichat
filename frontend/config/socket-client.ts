import { io } from "socket.io-client";

export type ConnectSocket = {
  onReady: () => void
  onDisconnect: () => void
};

export function connectSocket({ onReady, onDisconnect }: ConnectSocket) {
  return new Promise((resolve) => {
    if (!window.clientSocket?.connected) {
      window.clientSocket = io(process.env.NEXT_PUBLIC_BACKEND_DOMAIN as string, {
        transports: ["websocket"],
        withCredentials: true,
      });
      window.clientSocket.on('connect', () => {
        window.clientSocket.once('ready', (...args) => {
          // console.log(`server socket ready at ${args[0]}s`);
          onReady();
          resolve(window.clientSocket);
        })
        // setTimeout(() => resolve(window.clientSocket), 5_000);
      });
      window.clientSocket.on('disconnect', () => {
        onDisconnect();
      })
    } else {
      resolve(window.clientSocket);
    }
  });
}
