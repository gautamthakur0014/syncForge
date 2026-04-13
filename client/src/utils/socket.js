import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  console.warn("no BASE URL");
}
let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, { autoConnect: false });
  }
  return socket;
};
