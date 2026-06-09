"use client";

import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface AdvisorBooking {
  _id: string;

  advisorId: {
    _id: string;
    firstName: string;
    email: string;
    };

  bookingDate: string;

  bookingTime: string;

  status:
    | "pending"
    | "approved"
    | "completed"
    | "cancelled";

  remarks: string;

  isActive: boolean;
}

export default function AdvisorBookingsPage() {

  const [loading, setLoading] =
    useState(true);

  const [bookings, setBookings] =
    useState<AdvisorBooking[]>([]);

  const [advisorId, setAdvisorId] =
    useState("");

  const [bookingDate, setBookingDate] =
    useState("");

  const [bookingTime, setBookingTime] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const fetchBookings = async () => {

    try {

      const response =
        await api.get(
          "/advisor-bookings/my"
        );

      setBookings(
        response.data.data
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchBookings();

  }, []);

  const handleCreateBooking = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    try {

      await api.post(
        "/advisor-bookings",
        {
          advisorId,
          bookingDate,
          bookingTime,
          remarks,
        }
      );

      setAdvisorId("");
      setBookingDate("");
      setBookingTime("");
      setRemarks("");

      await fetchBookings();

    } catch (error: any) {

      console.log(error);

      alert(
        JSON.stringify(
          error.response?.data
        )
      );
    }
  };

  const cancelBooking = async (
    id: string
  ) => {

    try {

      await api.patch(
        `/advisor-bookings/${id}/cancel`
      );

      await fetchBookings();

    } catch (error) {

      console.log(error);
    }
  };

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Advisor Bookings
      </h1>

      <form
        onSubmit={handleCreateBooking}
        className="border p-4 rounded mb-6 space-y-3"
      >

        <input
          type="text"
          placeholder="Advisor Id"
          value={advisorId}
          onChange={(e) =>
            setAdvisorId(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="date"
          value={bookingDate}
          onChange={(e) =>
            setBookingDate(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <input
          type="time"
          value={bookingTime}
          onChange={(e) =>
            setBookingTime(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) =>
            setRemarks(
              e.target.value
            )
          }
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="border px-4 py-2"
        >
          Book Advisor
        </button>

      </form>

      <div className="space-y-4">

        {bookings.map(
          (booking) => (

            <div
              key={booking._id}
              className="border p-4 rounded"
            >

              <p>
                Advisor:
                {" "}
                {booking.advisorId.firstName}
              </p>

              <p>
                Date:
                {" "}
                {new Date(
                  booking.bookingDate
                ).toLocaleDateString()}
              </p>

              <p>
                Time:
                {" "}
                {booking.bookingTime}
              </p>

              <p>
                Remarks:
                {" "}
                {booking.remarks}
              </p>

              <p>
                Status:
                {" "}

                <span
                  className={
                    booking.status === "approved"
                      ? "text-green-600 font-bold"
                      : booking.status === "pending"
                      ? "text-yellow-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {booking.status}
                </span>
              </p>

              {
                booking.status !==
                  "cancelled" &&
                booking.status !==
                  "completed" && (

                  <button
                    onClick={() =>
                      cancelBooking(
                        booking._id
                      )
                    }
                    className="
                      border
                      px-4
                      py-2
                      mt-2
                    "
                  >
                    Cancel Booking
                  </button>

                )
              }

            </div>

          )
        )}

      </div>

    </div>
  );
}