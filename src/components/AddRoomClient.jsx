"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

const AMENITY_OPTIONS = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const AddRoomClient = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const onSubmit = async (data) => {
    if (selectedAmenities.length === 0) {
      toast.error("Please select at least one amenity.");
      return;
    }

    try {
      const formattedData = {
        name: data.name,
        shortDescription: data.shortDescription,
        image: data.image,
        floor: data.floor,
        seatCapacity: data.seatCapacity,
        hourlyRate: Number(data.hourlyRate),
        amenities: selectedAmenities,
        userEmail: session?.user?.email || "",
        userId: session?.user?.id || session?.user?._id || "",
      };

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) {
        toast.error("Backend URL is not configured");
        return;
      }

      const res = await fetch(`${backendUrl}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-email": session?.user?.email || "",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Failed to add room");
      }

      toast.success("Room added successfully");
      reset();
      setSelectedAmenities([]);
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to add room");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-2xl px-4 py-10">
      <div className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary">
            Add a Study Room
          </h2>
          <p className="text-sm text-base-content/70">
            Fill in the details below to list a new private study space or team room.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Room Name *</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Silent Focus Pod A"
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                {...register("name", { required: "Room name is required" })}
              />
              {errors.name && (
                <span className="mt-1 text-xs text-error">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Room Image URL *</span>
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                className={`input input-bordered w-full ${errors.image ? "input-error" : ""}`}
                {...register("image", { required: "Image URL is required" })}
              />
              {errors.image && (
                <span className="mt-1 text-xs text-error">
                  {errors.image.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Description *</span>
              </label>
              <textarea
                rows="3"
                placeholder="Detailed description of the study room..."
                className={`textarea textarea-bordered w-full ${errors.shortDescription ? "textarea-error" : ""}`}
                {...register("shortDescription", {
                  required: "Description is required",
                })}
              />
              {errors.shortDescription && (
                <span className="mt-1 text-xs text-error">
                  {errors.shortDescription.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Floor *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3rd Floor"
                  className={`input input-bordered w-full ${errors.floor ? "input-error" : ""}`}
                  {...register("floor", { required: "Floor is required" })}
                />
                {errors.floor && (
                  <span className="mt-1 text-xs text-error">
                    {errors.floor.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Seat Capacity *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4 people"
                  className={`input input-bordered w-full ${errors.seatCapacity ? "input-error" : ""}`}
                  {...register("seatCapacity", {
                    required: "Capacity is required",
                  })}
                />
                {errors.seatCapacity && (
                  <span className="mt-1 text-xs text-error">
                    {errors.seatCapacity.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Hourly Rate ($) *</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 5"
                  className={`input input-bordered w-full ${errors.hourlyRate ? "input-error" : ""}`}
                  {...register("hourlyRate", {
                    required: "Rate is required",
                    min: { value: 0, message: "Rate cannot be negative" },
                  })}
                />
                {errors.hourlyRate && (
                  <span className="mt-1 text-xs text-error">
                    {errors.hourlyRate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Amenities *</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 pt-1">
                {AMENITY_OPTIONS.map((amenity) => (
                  <label
                    key={amenity}
                    className="label cursor-pointer justify-start gap-2.5 rounded-lg border border-base-300 p-2.5 hover:bg-base-200/50">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="label-text text-xs font-medium">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary text-white w-full shadow-md">
                {isSubmitting ? "Adding Room..." : "Add Room"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddRoomClient;
