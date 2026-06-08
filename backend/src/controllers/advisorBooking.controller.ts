import { Request, Response } from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from "../services/advisorBooking.service";



export const createBookingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const {
      advisorId,
      bookingDate,
      bookingTime,
      remarks,
    } = req.body;

    const result =
      await createBooking({
        userId: req.user!.userId,
        advisorId,
        bookingDate,
        bookingTime,
        remarks,
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



export const getMyBookingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const userId =
      req.user!.userId;

    const result =
      await getMyBookings(
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



export const getBookingByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const bookingId =
      req.params.id as string;

    const currentUserId =
      req.user!.userId;

    const role =
      req.user!.role;

    const result =
      await getBookingById(
        bookingId,
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



export const getAllBookingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const result =
      await getAllBookings();

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



export const updateBookingStatusController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const bookingId =
      req.params.id as string;

    const {
      status,
      remarks,
    } = req.body;

    const result =
      await updateBookingStatus(
        bookingId,
        {
          status,
          remarks,
        }
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



export const cancelBookingController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const bookingId =
      req.params.id as string;

    const currentUserId =
      req.user!.userId;

    const result =
      await cancelBooking(
        bookingId,
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