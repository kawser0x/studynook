"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  FaCalendarAlt,
  FaBan,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const MYBookingPage = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const userEmail = session?.user?.email;

  const fetchBookings = useCallback(
    async (signal) => {
      const { data: tokenData } = await authClient.token();
      if (!userEmail) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/my-bookings`,
          {
            headers: { "user-email": userEmail },
            
            signal,
          },
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          toast.error("Failed to load your reservations");
        }
      } finally {
        setLoading(false);
      }
    },
    [userEmail],
  );

  useEffect(() => {
    if (sessionLoading) return;
    const controller = new AbortController();
    fetchBookings(controller.signal);
    return () => controller.abort();
  }, [sessionLoading, fetchBookings]);

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    setIsCancelling(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/${selectedBooking._id}`,
        {
          method: "DELETE",
          headers: { "user-email": userEmail || "" },
          authorization: `bearer ${tokenData?.token}`,
        },
      );
      if (!res.ok) throw new Error("Failed to delete booking");

      setBookings((prev) => prev.filter((b) => b._id !== selectedBooking._id));

      toast.success("Booking deleted successfully");
      document.getElementById("cancel_modal")?.close();
      setSelectedBooking(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete reservation");
    } finally {
      setIsCancelling(false);
    }
  };

  const isCancellable = (booking) => {
    if (booking.status !== "confirmed") return false;
    const today = new Date().toISOString().split("T")[0];
    return booking.date >= today;
  };

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-base-content sm:text-4xl">
            My Study Reservations
          </h1>
          <p className="mt-1 text-sm text-base-content/70">
            View, track, and manage your booked study pods and team rooms.
          </p>
        </div>

        {loading || sessionLoading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-base-content/40 mb-4">
              <FaCalendarAlt className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-base-content">
              You have no bookings yet.
            </h3>
            <p className="mt-1 text-xs text-base-content/60 max-w-sm mx-auto">
              Ready to focus? Browse our available pods and book your dedicated
              time slot.
            </p>
            <Link
              href="/rooms"
              className="btn btn-primary btn-sm mt-5 text-white">
              Explore Rooms
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="border-b border-base-300 text-xs text-base-content/60">
                  <th>Room</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Total Cost</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="text-xs sm:text-sm">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-base-300">
                          <Image
                            src={
                              b.roomImage ||
                              "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=200&q=80"
                            }
                            alt={b.roomName || "Room"}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-base-content">
                            {b.roomName}
                          </div>
                          {b.specialNote && (
                            <div className="text-[11px] text-base-content/50 truncate max-w-[150px]">
                              Note: {b.specialNote}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap font-medium text-base-content">
                      {b.date}
                    </td>
                    <td className="whitespace-nowrap text-base-content/80">
                      {b.startTime} - {b.endTime}
                    </td>
                    <td className="whitespace-nowrap font-semibold text-primary">
                      ${b.totalCost}
                    </td>
                    <td>
                      {b.status === "confirmed" ? (
                        <span className="badge badge-success badge-sm gap-1 text-white">
                          <FaCheckCircle className="h-3 w-3" /> confirmed
                        </span>
                      ) : (
                        <span className="badge badge-error badge-sm gap-1 text-white">
                          <FaTimesCircle className="h-3 w-3" /> cancelled
                        </span>
                      )}
                    </td>
                    <td className="text-right">
                      {isCancellable(b) && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedBooking(b);
                            document
                              .getElementById("cancel_modal")
                              ?.showModal();
                          }}
                          className="btn btn-outline btn-error btn-xs gap-1">
                          <FaBan /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <dialog
          id="cancel_modal"
          className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300">
            <h3 className="text-lg font-bold text-error">
              Confirm Reservation Cancellation
            </h3>
            <p className="py-3 text-sm text-base-content/80">
              Are you sure you want to cancel your reservation for{" "}
              <strong>{selectedBooking?.roomName}</strong> on{" "}
              <strong>{selectedBooking?.date}</strong> (
              {selectedBooking?.startTime} - {selectedBooking?.endTime})?
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost btn-sm">Keep Booking</button>
              </form>
              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={isCancelling}
                className="btn btn-error btn-sm text-white">
                {isCancelling ? "Cancelling..." : "Yes, Cancel Booking"}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default MYBookingPage;
