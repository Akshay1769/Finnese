import express from "express";

import {
  sendMessageController,
  getMyChatsController,
  getConversationController,
  markChatAsReadController,
  deleteChatController,
} from "../controllers/chat.controller";

import { authenticate }
from "../middleware/auth.middleware";

const router =
  express.Router();

router.post(
  "/",
  authenticate,
  sendMessageController
);

router.get(
  "/my",
  authenticate,
  getMyChatsController
);

router.get(
  "/:userId",
  authenticate,
  getConversationController
);

router.patch(
  "/:id/read",
  authenticate,
  markChatAsReadController
);

router.delete(
  "/:id",
  authenticate,
  deleteChatController
);

export default router;