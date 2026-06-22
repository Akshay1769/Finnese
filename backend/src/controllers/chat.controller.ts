import {
  Request,
  Response,
} from "express";

import {
  sendMessage,
  getMyChats,
  getConversation,
  markChatAsRead,
  deleteChat,
} from "../services/chat.service";

export const sendMessageController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
 
      const {
        receiverId,
        message,
      } = req.body;

      const result =
        await sendMessage({
          senderId:
            req.user!.userId,
          receiverId,
          message,
        });

      res.status(201).json(
        result
      );

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      res.status(400).json({
        success: false,
        message,
      });
    }
  };

export const getMyChatsController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const result =
        await getMyChats(
          req.user!.userId
        );

      res.status(200).json(
        result
      );

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      res.status(400).json({
        success: false,
        message,
      });
    }
  };

export const getConversationController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const otherUserId =
        req.params.userId as string;

      const result =
        await getConversation(
          req.user!.userId,
          otherUserId
        );

      res.status(200).json(
        result
      );

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      res.status(400).json({
        success: false,
        message,
      });
    }
  };

export const markChatAsReadController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const chatId =
        req.params.id as string;

      const result =
        await markChatAsRead(
          chatId,
          req.user!.userId
        );

      res.status(200).json(
        result
      );

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      res.status(400).json({
        success: false,
        message,
      });
    }
  };

export const deleteChatController =
  async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {

      const chatId =
        req.params.id as string;

      const result =
        await deleteChat(
          chatId,
          req.user!.userId
        );

      res.status(200).json(
        result
      );

    } catch (error) {

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong";

      res.status(400).json({
        success: false,
        message,
      });
    }
  };