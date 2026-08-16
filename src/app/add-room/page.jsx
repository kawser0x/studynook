"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddRoomPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        hourlyRate: Number(data.hourlyRate),
        amenities: data.amenities
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await res.json();
      toast.success("Room added successfully!");
      reset();
    } catch (error) {
      toast.warning("Failed to add room");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="card border border-base-300 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-primary">
            Add a Study Room
          </h2>
          <p className="text-sm text-base-content/70">
            Fill in the details below to list a new study or collaborative
            space.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl font-bold">Room Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Silent Solo Study Pod"
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
                <span className="label-text text-xl font-bold">
                  Room Image URL
                </span>
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
                <span className="label-text text-xl font-bold">
                  Short Description (Max ~100 chars)
                </span>
              </label>
              <textarea
                rows="2"
                maxLength={120}
                placeholder="Brief description for card display..."
                className={`textarea textarea-bordered w-full ${errors.shortDescription ? "textarea-error" : ""}`}
                {...register("shortDescription", {
                  required: "Description is required",
                  maxLength: {
                    value: 110,
                    message: "Keep description close to 100 characters",
                  },
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
                  <span className="label-text text-xl font-bold">Floor</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Floor 3"
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
                  <span className="label-text text-xl font-bold">
                    Seat Capacity
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2–4 people"
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
                  <span className="label-text text-xl font-bold">
                    Hourly Rate ($)
                  </span>
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
                <span className="label-text text-xl font-bold">
                  Amenities (Comma separated)
                </span>
              </label>
              <input
                type="text"
                placeholder="Wi-Fi, Whiteboard, Power Outlets, AC"
                className={`input input-bordered w-full ${errors.amenities ? "input-error" : ""}`}
                {...register("amenities", {
                  required: "At least one amenity is required",
                })}
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Tip: Enter items separated by commas. Max 3 will show as chips
                  on cards.
                </span>
              </label>
              {errors.amenities && (
                <span className="mt-1 text-xs text-error">
                  {errors.amenities.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary text-white w-full">
                {isSubmitting ? "Adding Room..." : "Add Room"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
