import AdvisorBooking from "../models/advisorBooking.model";

interface CreateBookingData {
  userId: string;

  advisorId: string;

  bookingDate: Date;

  bookingTime: string;

  remarks?: string;
}

interface UpdateBookingStatusData {
  status:
    | "approved"
    | "completed"
    | "cancelled";

  remarks?: string;
}

export const createBooking = async (
  bookingData: CreateBookingData
) => {

  const booking =
    await AdvisorBooking.create(
      bookingData
    );

  return {
    success: true,
    message:
      "Advisor booking created successfully",
    data: booking,
  };
};

export const getMyBookings = async (
  userId: string
) => {

  const bookings =
    await AdvisorBooking.find({
      userId,
      isActive: true,
    })
      .populate(
        "advisorId",
        "firstName email"
      )
      .sort({
        createdAt: -1,
      });

  return {
    success: true,
    count: bookings.length,
    data: bookings,
  };
};

export const getBookingById = async (
  bookingId: string,
  currentUserId: string,
  role: string
) => {

  const booking =
    await AdvisorBooking.findById(
      bookingId
    )
      .populate(
        "userId",
        "firstName email"
      )
      .populate(
        "advisorId",
        "firstName email"
      );

  if (!booking) {
    throw new Error(
      "Booking not found"
    );
  }

  if (
    role !== "admin" &&
    booking.userId._id.toString() !==
      currentUserId &&
    booking.advisorId._id.toString() !==
      currentUserId
  ) {
    throw new Error(
      "Access denied"
    );
  }

  return {
    success: true,
    data: booking,
  };
};

export const getAllBookings =
  async () => {

    const bookings =
      await AdvisorBooking.find()
        .populate(
          "userId",
          "firstName email"
        )
        .populate(
          "advisorId",
          "firstName email"
        )
        .sort({
          createdAt: -1,
        });

    return {
      success: true,
      count: bookings.length,
      data: bookings,
    };
  };

export const updateBookingStatus =
  async (
    bookingId: string,
    updateData:
      UpdateBookingStatusData
  ) => {

    const booking =
      await AdvisorBooking.findByIdAndUpdate(
        bookingId,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!booking) {
      throw new Error(
        "Booking not found"
      );
    }

    return {
      success: true,
      message:
        "Booking status updated successfully",
      data: booking,
    };
  };

export const cancelBooking =
  async (
    bookingId: string,
    currentUserId: string
  ) => {

    const booking =
      await AdvisorBooking.findById(
        bookingId
      );

    if (!booking) {
      throw new Error(
        "Booking not found"
      );
    }

    if (
      booking.userId.toString() !==
      currentUserId
    ) {
      throw new Error(
        "Access denied"
      );
    }

    booking.status =
      "cancelled";

    await booking.save();

    return {
      success: true,
      message:
        "Booking cancelled successfully",
      data: booking,
    };
  };