import express from "express";

const router = express.Router();

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

import {
    getMyNotificationsController,
    getNotificationByIdController,    
    markNotificationAsReadController,
    createNotificationController,
    getAllNotificationsController,
    deleteNotificationController
} from "../controllers/notification.controller";


router.get(
  "/me",
  authenticate,
  getMyNotificationsController
);

router.get(
  "/:id",
  authenticate,
  getNotificationByIdController
);

router.patch(
  "/:id/read",
  authenticate,
  markNotificationAsReadController
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createNotificationController
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllNotificationsController
);

router.delete(
  "/:id",
  authenticate,
  deleteNotificationController
);

export default router;