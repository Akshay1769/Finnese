import Chat from "../models/chat.model";

interface CreateChatData {
  senderId: string;
  receiverId: string;
  message: string;
}

export const sendMessage = async (
  chatData: CreateChatData
) => {

  const chat =
    await Chat.create(
      chatData
    );

  return {
    success: true,
    message:
      "Message sent successfully",
    data: chat,
  };
};

export const getMyChats = async (
  userId: string
) => {

  const chats =
    await Chat.find({
      $or: [
        { senderId: userId },
        { receiverId: userId },
      ],
    })
      .populate(
        "senderId",
        "firstName email"
      )
      .populate(
        "receiverId",
        "firstName email"
      )
      .sort({
        createdAt: -1,
      });

  return {
    success: true,
    count: chats.length,
    data: chats,
  };
};

export const getConversation = async (
  currentUserId: string,
  otherUserId: string
) => {

  const chats =
    await Chat.find({
      $or: [
        {
          senderId: currentUserId,
          receiverId: otherUserId,
        },
        {
          senderId: otherUserId,
          receiverId: currentUserId,
        },
      ],
    })
      .populate(
        "senderId",
        "firstName email"
      )
      .populate(
        "receiverId",
        "firstName email"
      )
      .sort({
        createdAt: 1,
      });

  return {
    success: true,
    count: chats.length,
    data: chats,
  };
};

export const markChatAsRead = async (
  chatId: string,
  currentUserId: string
) => {

  const chat =
    await Chat.findById(
      chatId
    );

  if (!chat) {
    throw new Error(
      "Message not found"
    );
  }

  if (
    chat.receiverId.toString() !==
    currentUserId
  ) {
    throw new Error(
      "Access denied"
    );
  }

  chat.isRead = true;

  await chat.save();

  return {
    success: true,
    message:
      "Message marked as read",
    data: chat,
  };
};

export const deleteChat = async (
  chatId: string,
  currentUserId: string
) => {

  const chat =
    await Chat.findById(
      chatId
    );

  if (!chat) {
    throw new Error(
      "Message not found"
    );
  }

  if (
    chat.senderId.toString() !==
      currentUserId &&
    chat.receiverId.toString() !==
      currentUserId
  ) {
    throw new Error(
      "Access denied"
    );
  }

  await Chat.findByIdAndDelete(
    chatId
  );

  return {
    success: true,
    message:
      "Message deleted successfully",
  };
};