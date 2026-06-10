"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Notification {
  _id: string;

  title: string;

  message: string;

  type:
    | "KYC"
    | "PORTFOLIO"
    | "INVESTMENT"
    | "BLOG"
    | "SYSTEM";

  isRead: boolean;

  emailSent: boolean;

  isActive: boolean;
}

export default function NotificationsPage() {

  const [loading, setLoading] =
    useState(true);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const fetchNotifications = async () => {

    try {

      const response =
        await api.get(
          "/notifications/me"
        );

      setNotifications(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchNotifications();

  }, []);

  const markAsRead = async (
    id: string
  ) => {

    try {

      await api.patch(
        `/notifications/${id}/read`
      );

      fetchNotifications();

    } catch (error) {

      console.log(error);
    }
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map(
          (notification) => (

            <div
              key={notification._id}
              className="border p-4 rounded"
            >

              <h2 className="text-xl font-bold">
                {notification.title}
              </h2>

              <p>
                {notification.message}
              </p>

              <p>
                Type:
                {" "}
                {notification.type}
              </p>

              <p>
                Email Sent:
                {" "}
                {
                  notification.emailSent
                    ? "Yes"
                    : "No"
                }
              </p>

              <p>
                Status:
                {" "}

                <span
                  className={
                    notification.isRead
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {
                    notification.isRead
                      ? "Read"
                      : "Unread"
                  }
                </span>
              </p>

              {
                !notification.isRead && (

                  <button
                    onClick={() =>
                      markAsRead(
                        notification._id
                      )
                    }
                    className="
                      border
                      px-4
                      py-2
                      mt-2
                    "
                  >
                    Mark As Read
                  </button>

                )
              }

            </div>

          )
        )}

      </div>

    </div>
  );
}