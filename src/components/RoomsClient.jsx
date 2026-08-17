
"use client";

import { useEffect, useState, useCallback } from "react";
import AllRooms from "@/components/AllRooms";
import { FaSearch, FaTimes, FaFilter, FaRedo } from "react-icons/fa";

const AVAILABLE_AMENITIES = [
  "Wi-Fi",
  "Whiteboard",
  "Power Outlets",
  "AC",
  "Monitor",
  "Soundproof",
  "Projector",
];

const RoomsClient = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [availableFloors, setAvailableFloors] = useState([]);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (searchTerm.trim()) params.append("search", searchTerm.trim());
      if (selectedFloor !== "all") params.append("floor", selectedFloor);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (selectedAmenities.length > 0) {
        params.append("amenities", selectedAmenities.join(","));
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms?${params.toString()}`,
      );
      const data = await res.json();
      const loadedRooms = Array.isArray(data) ? data : [];
      setRooms(loadedRooms);

      if (availableFloors.length === 0 && loadedRooms.length > 0) {
        const floors = Array.from(
          new Set(loadedRooms.map((r) => r.floor).filter(Boolean)),
        );
        setAvailableFloors(floors);
      }
    } catch (error) {
      console.error("Failed to load rooms:", error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedAmenities, selectedFloor, minPrice, maxPrice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRooms();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchRooms]);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedAmenities([]);
    setSelectedFloor("all");
    setMinPrice("");
    setMaxPrice("");
  };

  const isFiltered =
    Boolean(searchTerm) ||
    selectedAmenities.length > 0 ||
    selectedFloor !== "all" ||
    Boolean(minPrice) ||
    Boolean(maxPrice);

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            Available Study Rooms
          </h1>
          <p className="mt-2 text-sm text-base-content/70">
            Search by room name, filter by amenities, price range, or floor.
          </p>
        </div>
        <div className="mb-8 rounded-2xl border border-base-300 bg-base-200/50 p-5 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative lg:col-span-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                <FaSearch className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search by room name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-9"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/40 hover:text-base-content">
                  <FaTimes className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="select select-bordered w-full">
              <option value="all">All Floors</option>
              {availableFloors.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input input-bordered w-1/2"
              />
              <input
                type="number"
                min="0"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input input-bordered w-1/2"
              />
            </div>
          </div>

          <div className="mt-4 border-t border-base-300 pt-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-base-content/70">
              Filter by Amenities ($in)
            </span>
            <div className="mt-2 flex flex-wrap gap-2 sm:gap-3">
              {AVAILABLE_AMENITIES.map((amenity) => {
                const checked = selectedAmenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                      checked
                        ? "border-primary bg-primary text-white"
                        : "border-base-300 bg-base-100 text-base-content hover:bg-base-200"
                    }`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleAmenityChange(amenity)}
                      className="hidden"
                    />
                    {amenity}
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-base-300 pt-3 text-xs text-base-content/70">
            <span>
              Found{" "}
              <strong className="text-base-content">{rooms.length}</strong>{" "}
              matching rooms
            </span>
            {isFiltered && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="link link-hover flex items-center gap-1 font-medium text-error">
                <FaRedo className="h-3 w-3" /> Reset all filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <AllRooms key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/50">
              <FaFilter className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-base-content">
              No rooms match your criteria
            </h3>
            <p className="mt-1 text-sm text-base-content/60">
              Try removing some amenities or broadening your price and search
              terms.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-primary btn-sm mt-4 text-white">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsClient;
