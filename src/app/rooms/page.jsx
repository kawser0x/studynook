"use client";

import { useEffect, useState, useMemo } from "react";
import AllRooms from "@/components/AllRooms";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`,
          { cache: "no-store" },
        );
        const data = await res.json();
        setRooms(Array.isArray(data) ? data : []);
      } 
    finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const floorOptions = useMemo(() => {
    const floors = rooms.map((r) => r.floor).filter(Boolean);
    return Array.from(new Set(floors));
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        room.name?.toLowerCase().includes(query) ||
        room.shortDescription?.toLowerCase().includes(query) ||
        room.amenities?.some((amenity) =>
          amenity.toLowerCase().includes(query),
        );

      const matchesFloor =
        selectedFloor === "all" || room.floor === selectedFloor;

      const matchesPrice =
        !maxPrice || Number(room.hourlyRate) <= Number(maxPrice);

      return matchesSearch && matchesFloor && matchesPrice;
    });
  }, [rooms, searchTerm, selectedFloor, maxPrice]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedFloor("all");
    setMaxPrice("");
  };

  return (
    <div className="min-h-screen bg-base-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
       
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            Available Study Rooms
          </h1>
          <p className="mt-2 text-sm text-base-content/70">
            Choose from quiet individual booths, pair study nooks, or group
            labs.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-base-300 bg-base-200/50 p-4 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
       
            <div className="relative lg:col-span-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50">
                <FaSearch className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search by room name, amenities, keyword..."
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
              {floorOptions.map((floor) => (
                <option key={floor} value={floor}>
                  {floor}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Max Rate ($/hr)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="mt-3 flex items-center justify-between px-1 text-xs text-base-content/70">
            <span>
              Showing{" "}
              <strong className="text-base-content">
                {filteredRooms.length}
              </strong>{" "}
              of {rooms.length} rooms
            </span>
            {(searchTerm || selectedFloor !== "all" || maxPrice) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="link link-hover font-medium text-error">
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : filteredRooms.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.map((room) => (
              <AllRooms key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-base-300 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content/50">
              <FaFilter className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-base-content">
              No matching rooms found
            </h3>
            <p className="mt-1 text-sm text-base-content/60">
              Try adjusting your search terms or clearing current filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-primary btn-sm mt-4 text-white">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
