"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Notification } from "@/types/notifications";
import { config } from "@/config";
import {
  notificationApi,
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useMarkAsAllReadNotificationMutation,
  useMarkAsReadNotificationMutation,
} from "@/redux/features/notifications/notificationApi";
import { useAppDispatch } from "@/redux/hooks";

export function useNotifications() {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useAppDispatch();
  // get all notification
  const { data, isLoading } = useGetAllNotificationsQuery({
    limit: 50,
    offset: 0,
  });
  const notifications = data?.data?.notifications || [];
  // notification rtk query hook
  const [markAsread] = useMarkAsReadNotificationMutation();
  const [markAsAllRead] = useMarkAsAllReadNotificationMutation();
  const [deleteNotification] = useDeleteNotificationMutation();

  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead
  ).length;
  const [isConnected, setIsConnected] = useState(false);

  const getAuthToken = () => {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split("; ");
    // Try common names; handle '=' inside value by splitting at first '='
    const names = ["accessToken", "access_token", "token"];
    for (const name of names) {
      const cookie = cookies.find((c) => c.startsWith(name + "="));
      if (cookie) {
        const idx = cookie.indexOf("=");
        return decodeURIComponent(cookie.substring(idx + 1));
      }
    }
    return null;
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsread(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAsAllRead(undefined).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteNotification(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  // ============ SOCKET.IO SETUP ==============
  useEffect(() => {
    const token = getAuthToken();
    const wsUrl = config.next_public_ws_url || "http://localhost:5000";
    const socket = io(wsUrl, {
      auth: token ? { token } : undefined,
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 10000,
      path: "/socket.io",
      withCredentials: true,
    });

    const invalidateNotifications = () => {
      dispatch(notificationApi.util.invalidateTags(["notifications"]));
    };

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("connect_error", (error) => {
      setIsConnected(false);
    });

    socket.on("error", (error) => {
      console.error("❌ WebSocket error:", error);
    });

    // NEW NOTIFICATION
    socket.on("notification:new", (notification: Notification) => {
      invalidateNotifications();
      // Show browser notification if permission granted
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/icon-192x192.png",
          tag: `notification-${notification.id}`,
        });
      }
    });

    // UNREAD COUNT
    socket.on("notification:unreadCount", () => {
      invalidateNotifications();
    });

    // DELETED
    socket.on("notification:deleted", () => {
      invalidateNotifications();
    });

    socket.on("disconnect", () => {
      invalidateNotifications();
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    isLoading,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleDeleteNotification,
  };
}
