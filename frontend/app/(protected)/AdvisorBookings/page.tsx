"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import LogoAnimation from "@/components/pageloader"

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
    
    return <div className ="min-h-screen flex items-center justify-center"> <LogoAnimation/></div>
  }

  return (
  <div className="min-h-screen max-w-7xl mx-auto px-6 py-8">

    <div className="mb-10">

      <h1 className="text-4xl font-black text-white">
        Advisor Bookings
      </h1>

      <p className="text-white/50 mt-2">
        Schedule consultations with financial advisors and track your appointments.
      </p>

    </div>

    <form
      onSubmit={handleCreateBooking}
      className="bg-gray-900/80 border border-white/10 rounded-3xl p-8 max-w-3xl mx-auto shadow-xl mb-10 space-y-5"
    >

      <input
        type="text"
        placeholder="Advisor ID"
        value={advisorId}
        onChange={(e) => setAdvisorId(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
      />

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
        />

        <input
          type="time"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
          className="w-full p-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-400 transition-all"
        />

      </div>

      <textarea
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        rows={4}
        className="w-full p-3 bg-black border border-white/10 rounded-xl text-white resize-none focus:outline-none focus:border-amber-400 transition-all"
      />

      <button
        type="submit"
        className="w-full bg-amber-400 text-black font-bold py-3 rounded-xl hover:bg-amber-300 hover:scale-[1.02] transition-all duration-300"
      >
        Book Advisor
      </button>

    </form>

    {bookings.length === 0 ? (

      <div className="bg-gray-900/80 border border-white/10 rounded-3xl p-12 text-center">

        <h2 className="text-2xl font-bold text-white">
          No Advisor Bookings
        </h2>

        <p className="text-white/50 mt-3">
          Schedule your first advisor consultation above.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-gray-900/80 border border-white/10 rounded-3xl p-6 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/10 transition-all duration-300"
          >

            <div className="flex justify-between items-start mb-5">

              <div>

                <h2 className="text-xl font-bold text-white">
                  {booking.advisorId.firstName}
                </h2>

                <p className="text-white/40 text-sm">
                  {booking.advisorId.email}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : booking.status === "pending"
                    ? "bg-amber-500/10 text-amber-400"
                    : booking.status === "completed"
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {booking.status}
              </span>

            </div>

            <div className="space-y-4">

              <div className="bg-black border border-white/10 rounded-2xl p-4">

                <p className="text-white/40 text-sm">
                  Appointment Date
                </p>

                <p className="text-white font-semibold">
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>

              </div>

              <div className="bg-black border border-white/10 rounded-2xl p-4">

                <p className="text-white/40 text-sm">
                  Appointment Time
                </p>

                <p className="text-white font-semibold">
                  {booking.bookingTime}
                </p>

              </div>

              <div className="bg-black border border-white/10 rounded-2xl p-4">

                <p className="text-white/40 text-sm">
                  Remarks
                </p>

                <p className="text-white">
                  {booking.remarks || "No remarks provided"}
                </p>

              </div>

            </div>

            {booking.status !== "cancelled" &&
              booking.status !== "completed" && (

                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="mt-5 w-full border border-red-500/30 text-red-400 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-300"
                >
                  Cancel Booking
                </button>

              )}

          </div>

        ))}

      </div>

    )}

  </div>
);
}