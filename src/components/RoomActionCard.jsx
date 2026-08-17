"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient, getAuthToken } from "@/lib/auth-client";
import {
  FaLayerGroup,
  FaUserFriends,
  FaCalendarAlt,
  FaSignInAlt,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import BookRoomModal from "@/components/BookRoomModal";
import EditRoomModal from "./EditRoomModal";

const RoomActionCard = ({ room }) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!room || !room._id) return null;

  const currentUser = session?.user;
  const deleteModalId = `delete_modal_${room._id}`;

  const handleDeleteRoom = async () => {
    setIsDeleting(true);
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "https://studynook-server-pearl.vercel.app";
      const token = await getAuthToken();

      const res = await fetch(`${backendUrl}/rooms/${room._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-email": currentUser?.email || "",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) throw new Error("Failed to delete room");

      toast.success("Room deleted successfully");
      document.getElementById(deleteModalId)?.close();
      router.push("/rooms");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete room");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="sticky top-24 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl">
      <div className="flex items-baseline justify-between border-b border-base-300 pb-4">
        <div>
          <span className="text-3xl font-extrabold text-primary">
            ${room.hourlyRate}
          </span>
          <span className="text-sm text-base-content/60"> / hour</span>
        </div>
        <div className="badge badge-success badge-sm text-white">Available</div>
      </div>

      <div className="space-y-3 py-5 text-xs text-base-content/70">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaLayerGroup className="text-primary" /> Location
          </span>
          <span className="font-semibold text-base-content">{room.floor}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaUserFriends className="text-primary" /> Capacity
          </span>
          <span className="font-semibold text-base-content">
            {room.seatCapacity}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" /> Total Bookings
          </span>
          <span className="font-semibold text-base-content">
            {room.bookingCount || 0}
          </span>
        </div>
      </div>

      <div className="space-y-2.5 pt-2">
        {isPending ? (
          <button disabled className="btn btn-primary w-full text-white">
            <span className="loading loading-spinner loading-sm" />
          </button>
        ) : currentUser ? (
          <BookRoomModal room={room} />
        ) : (
          <Link
            href={`/signin?redirect=/rooms/${room._id}`}
            className="btn btn-primary w-full text-white shadow-md shadow-primary/20 hover:brightness-105">
            <FaSignInAlt /> Login to Book
          </Link>
        )}

        <div className="mt-3 space-y-2 border-t border-base-300 pt-3">
          <p className="text-center text-[11px] font-bold uppercase tracking-wider text-base-content/60">
            Room Management
          </p>

          <EditRoomModal room={room} />

          <button
            type="button"
            onClick={() => document.getElementById(deleteModalId)?.showModal()}
            className="btn btn-outline btn-error btn-sm w-full gap-2">
            <FaTrashAlt className="h-3 w-3" /> Delete Room
          </button>
        </div>

        <p className="text-center text-[11px] text-base-content/60 pt-1">
          Free cancellation up to 1 hour before reservation
        </p>
      </div>

      <dialog id={deleteModalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 border border-base-300">
          <h3 className="text-lg font-bold text-error">Confirm Deletion</h3>
          <p className="py-3 text-sm text-base-content/80">
            Are you sure you want to permanently delete{" "}
            <strong>{room.name}</strong>? This action cannot be undone.
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost btn-sm">Cancel</button>
            </form>
            <button
              onClick={handleDeleteRoom}
              disabled={isDeleting}
              className="btn btn-error btn-sm text-white">
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RoomActionCard;
