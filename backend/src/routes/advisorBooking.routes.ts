import express from "express";

import {
  createBookingController,
  getMyBookingsController,
  getBookingByIdController,
  getAllBookingsController,
  updateBookingStatusController,
  cancelBookingController,
} from "../controllers/advisorBooking.controller";

import { authenticate }
from "../middleware/auth.middleware";

import { authorize }
from "../middleware/role.middleware";

const router =
  express.Router();



router.post(
  "/",
  authenticate,
  createBookingController
);

router.get(
  "/my",
  authenticate,
  getMyBookingsController
);

router.get(
  "/:id",
  authenticate,
  getBookingByIdController
);

router.patch(
  "/:id/cancel",
  authenticate,
  cancelBookingController
);



router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllBookingsController
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("admin"),
  updateBookingStatusController
);

export default router;