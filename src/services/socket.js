import { io } from "socket.io-client";
import store from "../app/store";
import { pushNotification } from "../features/notifications/notificationsSlice";
import { upsertLead } from "../features/leads/leadsSlice";

let socket = null;

export function initSocket() {
  if (socket) return socket;

  const token = localStorage.getItem("token");

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { token },
  });

  // Notification event
  socket.on("notification", (data) => {
    store.dispatch(pushNotification(data));
  });

  // Lead updated in real-time
  socket.on("lead:update", (lead) => {
    store.dispatch(upsertLead(lead));
  });

  return socket;
}
