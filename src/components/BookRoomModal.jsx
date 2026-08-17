"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaStickyNote,
} from "react-icons/fa";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const BookRoomModal = ({ room }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const modalId = `book_modal_${room._id}`;

  const todayStr = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      date: todayStr,
      startTime: "09:00",
      endTime: "10:00",
      specialNote: "",
    },
  });

  const selectedStartTime = watch("startTime");
  const selectedEndTime = watch("endTime");

  // Filter end time slots to ensure minimum 1 hour booking
  const availableEndTimes = useMemo(() => {
    const startHour = parseInt(selectedStartTime?.split(":")[0] || "8", 10);
    return TIME_SLOTS.filter((time) => {
      const endHour = parseInt(time.split(":")[0], 10);
      return endHour > startHour;
    });
  }, [selectedStartTime]);

  // Compute total cost in real-time
  const totalCost = useMemo(() => {
    const startHour = parseInt(selectedStartTime?.split(":")[0] || "0", 10);
    const endHour = parseInt(selectedEndTime?.split(":")[0] || "0", 10);
    const hours = Math.max(0, endHour - startHour);
    return hours * (room.hourlyRate || 0);
  }, [selectedStartTime, selectedEndTime, room.hourlyRate]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        roomId: room._id,
        userId: session?.user?.id || session?.user?._id,
        userEmail: session?.user?.email,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        totalCost,
        specialNote: data.specialNote,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to reserve slot");
      }

      toast.success("Room booked successfully!");
      document.getElementById(modalId)?.close();
      reset();
      router.push("/my-booking");
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => document.getElementById(modalId)?.showModal()}
        className="btn btn-primary w-full text-white shadow-md shadow-primary/20 hover:brightness-105">
        <FaCalendarAlt /> Book Now
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300 max-w-lg text-left">
          <h3 className="text-xl font-bold text-base-content">
            Reserve {room.name}
          </h3>
          <p className="text-xs text-base-content/70 mt-1">
            Rate: ${room.hourlyRate}/hr • Floor: {room.floor}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
         
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Booking Date
                </span>
              </label>
              <input
                type="date"
                min={todayStr}
                className="input input-bordered input-sm w-full"
                {...register("date", { required: true })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">
                    Start Time
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm w-full"
                  {...register("startTime", { required: true })}>
                  {TIME_SLOTS.slice(0, -1).map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">
                    End Time
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm w-full"
                  {...register("endTime", { required: true })}>
                  {availableEndTimes.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="rounded-lg bg-base-200/60 p-3 flex items-center justify-between">
              <span className="text-xs font-semibold flex items-center gap-1.5 text-base-content/80">
                <FaDollarSign className="text-primary" /> Estimated Total Cost
              </span>
              <span className="text-lg font-bold text-primary">
                ${totalCost}
              </span>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Special Notes (Optional)
                </span>
              </label>
              <textarea
                rows="2"
                placeholder="Whiteboard markers needed, presentation setup, etc."
                className="textarea textarea-bordered textarea-sm w-full"
                {...register("specialNote")}
              />
            </div>

            <div className="modal-action gap-2 pt-2">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => document.getElementById(modalId)?.close()}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || totalCost <= 0}
                className="btn btn-primary btn-sm text-white">
                {isSubmitting ? "Checking Availability..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BookRoomModal;
