"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { FaPlus, FaTrashAlt, FaLayerGroup, FaUserFriends } from "react-icons/fa";
import { motion } from "framer-motion";
import EditRoomModal from "./EditRoomModal";

const MyListingsClient = () => {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const userEmail = session?.user?.email;

  const fetchUserRooms = useCallback(async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        setLoading(false);
        return;
      }
      const res = await fetch(`${backendUrl}/my-listings`, {
        headers: {
          "user-email": userEmail,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setRooms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your room listings");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (sessionLoading) return;
    fetchUserRooms();
  }, [sessionLoading, fetchUserRooms]);

  const handleDeleteRoom = async (roomId) => {
    setDeletingId(roomId);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${backendUrl}/rooms/${roomId}`, {
        method: "DELETE",
        headers: {
          "user-email": userEmail || "",
        },
      });

      if (!res.ok) throw new Error("Failed to delete room");

      toast.success("Room deleted successfully");
      setRooms((prev) => prev.filter((r) => r._id !== roomId));
      document.getElementById(`my_delete_modal_${roomId}`)?.close();
    } catch (err) {
      toast.error(err.message || "Failed to delete room");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-base-content sm:text-4xl">
              My Room Listings
            </h1>
            <p className="mt-1 text-sm text-base-content/70">
              Manage study rooms you have listed on StudyNook.
            </p>
          </div>
          <Link
            href="/add-room"
            className="btn btn-primary btn-sm text-white gap-2 shadow-md">
            <FaPlus className="h-3 w-3" /> Add New Room
          </Link>
        </div>

        {loading || sessionLoading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : rooms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
            <h3 className="text-lg font-bold text-base-content">
              You haven&apos;t listed any rooms yet.
            </h3>
            <p className="mt-1 text-xs text-base-content/60 max-w-sm mx-auto">
              Share quiet study spaces or private pods with fellow students and earn.
            </p>
            <Link
              href="/add-room"
              className="btn btn-primary btn-sm mt-5 text-white">
              List Your Room
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="card border border-base-300 bg-base-200/60 shadow-sm flex flex-col justify-between overflow-hidden">
                <figure className="relative h-48 w-full bg-base-300">
                  <Image
                    src={
                      room.image ||
                      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={room.name || "Room"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="absolute top-3 right-3 rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-content shadow">
                    ${room.hourlyRate}/hr
                  </span>
                </figure>

                <div className="card-body p-5">
                  <h2 className="card-title text-lg font-bold text-base-content line-clamp-1">
                    {room.name}
                  </h2>
                  <p className="mt-1 text-xs text-base-content/70 line-clamp-2 min-h-[32px]">
                    {room.shortDescription}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-y border-base-300/80 py-2 text-xs text-base-content/80">
                    <span className="flex items-center gap-1.5 font-medium">
                      <FaLayerGroup className="text-primary" /> {room.floor}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <FaUserFriends className="text-primary" /> {room.seatCapacity}
                    </span>
                  </div>

                  <div className="card-actions mt-4 grid grid-cols-2 gap-2">
                    <EditRoomModal room={room} />
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .getElementById(`my_delete_modal_${room._id}`)
                          ?.showModal()
                      }
                      className="btn btn-outline btn-error btn-sm gap-1 w-full">
                      <FaTrashAlt className="h-3 w-3" /> Delete
                    </button>
                  </div>
                </div>

                <dialog
                  id={`my_delete_modal_${room._id}`}
                  className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box bg-base-100 border border-base-300 text-left">
                    <h3 className="text-lg font-bold text-error">
                      Confirm Room Deletion
                    </h3>
                    <p className="py-3 text-sm text-base-content/80">
                      Are you sure you want to permanently delete{" "}
                      <strong>{room.name}</strong>?
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn btn-ghost btn-sm">Cancel</button>
                      </form>
                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        disabled={deletingId === room._id}
                        className="btn btn-error btn-sm text-white">
                        {deletingId === room._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyListingsClient;
