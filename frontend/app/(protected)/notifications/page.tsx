"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

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
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

  return (
    <div className="p-10">
     { notifications.length === 0 ?  (

      <div className="border rounded-lg p-6 text-center mt-6">

        <h2 className="text-xl font-semibold">
          No Notifications Found
        </h2>

        <p className="text-gray-500 mt-2 animate-bounce border-4 text-shadow-zinc-900">
              You will see your Notifications Here
        </p>

      </div>

    ) : (
          notifications.map(
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
        )
      )}
      </div>
  );
}