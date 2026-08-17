"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { authClient, getAuthToken } from "@/lib/auth-client";

const EditRoomModal = ({ room = {} }) => {
  const router = useRouter();

  const modalId = `edit_modal_${room?._id || "new"}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: room?.name || "",
      image: room?.image || "",
      shortDescription: room?.shortDescription || "",
      floor: room?.floor || "",
      seatCapacity: room?.seatCapacity || "",
      hourlyRate: room?.hourlyRate || "",
      amenities: Array.isArray(room?.amenities)
        ? room.amenities.join(", ")
        : "",
    },
  });

  useEffect(() => {
    if (room && room._id) {
      reset({
        name: room?.name || "",
        image: room?.image || "",
        shortDescription: room?.shortDescription || "",
        floor: room?.floor || "",
        seatCapacity: room?.seatCapacity || "",
        hourlyRate: room?.hourlyRate || "",
        amenities: Array.isArray(room?.amenities)
          ? room.amenities.join(", ")
          : "",
      });
    }
  }, [room, reset]);

  const onSubmit = async (data) => {
    if (!room?._id) {
      toast.error("Room ID is missing!");
      return;
    }

    try {
      const formattedData = {
        ...data,
        hourlyRate: Number(data.hourlyRate),
        amenities: typeof data.amenities === "string"
          ? data.amenities
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item.length > 0)
          : data.amenities,
      };

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        toast.error("Backend URL is not configured");
        return;
      }
      const token = await getAuthToken();

      const res = await fetch(`${backendUrl}/rooms/${room._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update room details");
      }

      toast.success("Room updated successfully!");
      document.getElementById(modalId)?.close();
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to update room details");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => document.getElementById(modalId)?.showModal()}
        className="btn btn-neutral w-full text-white gap-2 ">
        <FaEdit className="h-3 w-3 " /> Edit Room Details
      </button>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-xl text-left bg-base-100 border border-base-300">
          <h3 className="text-xl font-bold text-base-content">
            Edit Room Information
          </h3>
          <p className="text-xs text-base-content/70 mt-1">
            Modify the room attributes below and save changes.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Room Name
                </span>
              </label>
              <input
                type="text"
                className={`input input-bordered input-sm w-full ${errors.name ? "input-error" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Image URL
                </span>
              </label>
              <input
                type="url"
                className={`input input-bordered input-sm w-full ${errors.image ? "input-error" : ""}`}
                {...register("image", { required: "Image URL is required" })}
              />
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Short Description
                </span>
              </label>
              <textarea
                rows="2"
                maxLength={120}
                className="textarea textarea-bordered textarea-sm w-full"
                {...register("shortDescription", {
                  required: "Description is required",
                })}
              />
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">
                    Floor
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  {...register("floor", { required: "Required" })}
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">
                    Seat Capacity
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  {...register("seatCapacity", { required: "Required" })}
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text text-xs font-semibold">
                    Hourly Rate ($)
                  </span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="input input-bordered input-sm w-full"
                  {...register("hourlyRate", { required: "Required", min: 0 })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text text-xs font-semibold">
                  Amenities (comma separated)
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered input-sm w-full"
                {...register("amenities", {
                  required: "At least one amenity is required",
                })}
              />
            </div>

            <div className="modal-action mt-6 gap-2">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => document.getElementById(modalId)?.close()}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-sm text-white">
                {isSubmitting ? "Saving..." : "Save Changes"}
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

export default EditRoomModal;
