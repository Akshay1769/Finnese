import { Request, Response } from "express";

import {
  createNotification,
  getMyNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
  getAllNotifications,
} from "../services/notification.service";



export const createNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      userId,
      title,
      message,
      type,
    } = req.body;

    const result =
      await createNotification({
        userId,
        title,
        message,
        type,
      });

    res.status(201).json(result);
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



export const getMyNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId =
      req.user!.userId;

    const result =
      await getMyNotifications(
        userId
      );

    res.status(200).json(result);
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



export const getNotificationByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notificationId =
      req.params.id as string;

    const currentUserId =
      req.user!.userId;

    const role =
      req.user!.role;

    const result =
      await getNotificationById(
        notificationId,
        role,
        currentUserId
      );

    res.status(200).json(result);
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



export const markNotificationAsReadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notificationId =
      req.params.id as string;

    const currentUserId =
      req.user!.userId;

    const role =
      req.user!.role;

    const result =
      await markNotificationAsRead(
        notificationId,
        currentUserId,
        role
      );

    res.status(200).json(result);
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



export const deleteNotificationController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const notificationId =
      req.params.id as string;

    const currentUserId =
      req.user!.userId;

    const role =
      req.user!.role;

    const result =
      await deleteNotification(
        notificationId,
        currentUserId,
        role
      );

    res.status(200).json(result);
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



export const getAllNotificationsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result =
      await getAllNotifications();

    res.status(200).json(result);
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