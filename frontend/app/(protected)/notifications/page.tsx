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
  <div
    className="
      min-h-screen
      max-w-6xl
      mx-auto
      px-6
      py-8
    "
  >

    <div className="mb-10">

      <h1
        className="
          text-4xl
          font-black
          text-white
        "
      >
        Notifications
      </h1>

      <p
        className="
          text-white/50
          mt-2
        "
      >
        Stay updated with your account activity and investment alerts.
      </p>

    </div>

    {notifications.length === 0 ? (

      <div
        className="
          bg-gray-900/80

          border
          border-white/10

          rounded-3xl

          p-12

          text-center
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            text-white
          "
        >
          No Notifications Found
        </h2>

        <p
          className="
            text-white/50
            mt-3
          "
        >
          You will see your notifications here.
        </p>

      </div>

    ) : (

      <div
        className="
          grid
          grid-cols-1
          gap-6
        "
      >

        {notifications.map(
          (notification) => (

            <div
              key={notification._id}
              className="
                bg-gray-900/80

                border
                border-white/10

                rounded-3xl

                p-6

                hover:border-amber-400

                hover:shadow-lg
                hover:shadow-amber-400/10

                transition-all
                duration-300
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                  gap-4
                "
              >

                <div>

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-white
                      mb-2
                    "
                  >
                    {notification.title}
                  </h2>

                  <p
                    className="
                      text-white/70
                      mb-4
                    "
                  >
                    {notification.message}
                  </p>

                </div>

                <span
                  className="
                    px-3
                    py-1

                    rounded-full

                    bg-amber-500/10
                    text-amber-400

                    text-xs
                    font-medium

                    whitespace-nowrap
                  "
                >
                  {notification.type}
                </span>

              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3

                  mt-4
                "
              >

                <span
                  className="
                    px-3
                    py-1

                    rounded-full

                    bg-gray-800

                    text-white/70

                    text-sm
                  "
                >
                  Email:
                  {" "}
                  {notification.emailSent
                    ? "Sent"
                    : "Not Sent"}
                </span>

                <span
                  className={`
                    px-3
                    py-1

                    rounded-full

                    text-sm
                    font-medium

                    ${
                      notification.isRead
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    }
                  `}
                >
                  {notification.isRead
                    ? "Read"
                    : "Unread"}
                </span>

              </div>

              {!notification.isRead && (

                <button
                  onClick={() =>
                    markAsRead(
                      notification._id
                    )
                  }
                  className="
                    mt-5

                    bg-amber-400

                    text-black

                    px-4
                    py-2

                    rounded-xl

                    font-semibold

                    hover:bg-amber-300

                    transition-all
                    duration-300
                  "
                >
                  Mark As Read
                </button>

              )}

            </div>

          )
        )}

      </div>

    )}

  </div>
);
}