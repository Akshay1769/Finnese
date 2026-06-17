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
  <div className="min-h-screen max-w-7xl mx-auto px-6 py-8">

    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        Messages
      </h1>

      <p className="text-white/50 mt-2">
        Communicate with advisors and users in real time.
      </p>

    </div>

    <form
      onSubmit={handleSendMessage}
      className="bg-gray-900/80 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto shadow-xl mb-10 space-y-5"
    >

      <input
        type="text"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
      />

      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-amber-400 transition-all"
      />

      <button
        type="submit"
        className="w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300"
      >
        Send Message
      </button>

    </form>

    {chats.length === 0 ? (

      <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-12 text-center">

        <h2 className="text-2xl font-bold text-white">
          No Messages Yet
        </h2>

        <p className="text-white/50 mt-3">
          Your conversations will appear here.
        </p>

      </div>

    ) : (

      <div className="space-y-6">

        {chats.map((chat) => (

          <div
            key={chat._id}
            className="bg-gray-900/80 border border-white/10 rounded-3xl p-6 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-300"
          >

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

              <div className="space-y-3 flex-1">

                <div>

                  <p className="text-white/40 text-sm">
                    From
                  </p>

                  <p className="text-white font-semibold">
                    {chat.senderId.firstName}
                  </p>

                </div>

                <div>

                  <p className="text-white/40 text-sm">
                    To
                  </p>

                  <p className="text-white font-semibold">
                    {chat.receiverId.firstName}
                  </p>

                </div>

              </div>

              <div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    chat.isRead
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {chat.isRead ? "Read" : "Unread"}
                </span>

              </div>

            </div>

            <div className="mt-5 p-4 bg-black border border-white/10 rounded-2xl">

              <p className="text-white/80 leading-relaxed">
                {chat.message}
              </p>

            </div>

            <div className="mt-4 flex justify-between items-center">

              <p className="text-white/40 text-sm">
                {new Date(chat.createdAt).toLocaleString()}
              </p>

              <span className="text-amber-400 text-sm font-medium">
                Message
              </span>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}