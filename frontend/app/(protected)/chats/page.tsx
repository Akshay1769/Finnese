"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

interface Chat {
  _id: string;

  senderId: {
    _id: string;
    firstName: string;
    email: string;
  };

  receiverId: {
    _id: string;
    firstName: string;
    email: string;
  };

  message: string;

  isRead: boolean;

  isActive: boolean;

  createdAt: string;
}

export default function ChatPage() {

  const [loading, setLoading] =
    useState(true);

  const [chats, setChats] =
    useState<Chat[]>([]);

  const [receiverId, setReceiverId] =
    useState("");

  const [message, setMessage] =
    useState("");

  const fetchChats = async () => {

    try {

      const response =
        await api.get(
          "/chats/my"
        );

      setChats(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchChats();

  }, []);

  const handleSendMessage = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      await api.post(
        "/chats",
        {
          receiverId,
          message,
        }
      );

      setReceiverId("");
      setMessage("");

      await fetchChats();

    } catch (error: any) {

      console.log(error);

      alert(
        JSON.stringify(
          error.response?.data
        )
      );
    }
  };

  if (loading) {
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Chat
      </h1>

      <form
        onSubmit={handleSendMessage}
        className="max-w-md mx-auto bg-mist-300 p-8 rounded-2xl shadow-lg shadow-gray-100/70 space-y-5"
      >

        <input
          type="text"
          placeholder="Receiver Id"
          value={receiverId}
          onChange={(e) =>
            setReceiverId(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-green-500 text-amber-50  hover:text-gray-950 font-medium py-2 px-4 rounded-md transition duration-150"
        >
          Send Message
        </button>

      </form>

      <div className="space-y-4">

        {chats.map(
          (chat) => (

            <div
              key={chat._id}
              className="border p-4 rounded"
            >

              <p>
                From:
                {" "}
                {chat.senderId.firstName}
              </p>

              <p>
                To:
                {" "}
                {chat.receiverId.firstName}
              </p>

              <p>
                Message:
                {" "}
                {chat.message}
              </p>

              <p>
                Status:
                {" "}

                <span
                  className={
                    chat.isRead
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {
                    chat.isRead
                      ? "Read"
                      : "Unread"
                  }
                </span>
              </p>

              <p>
                Sent:
                {" "}
                {
                  new Date(
                    chat.createdAt
                  ).toLocaleString()
                }
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}