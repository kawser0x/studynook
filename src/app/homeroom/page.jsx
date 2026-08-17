import Link from "next/link";
import AllRooms from "@/components/AllRooms";
import { FaArrowRight } from "react-icons/fa";

export const dynamic = "force-dynamic";

const HomeRoomPage = async () => {
  let rooms = [];

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backendUrl) {
      const res = await fetch(`${backendUrl}/rooms`,);
      if (res.ok) {
        rooms = await res.json();
      }
    }
  } catch (error) {
  }

  const latestRooms = Array.isArray(rooms) ? rooms.slice(0, 6) : [];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
              Latest <span className="text-primary">Study Rooms</span>
            </h2>
            <p className="mt-2 text-sm text-base-content/70">
              Discover newly listed quiet spaces and modern study hubs.
            </p>
          </div>
          <Link
            href="/rooms"
            className="btn btn-outline btn-primary btn-sm hidden sm:inline-flex gap-2">
            Explore All Rooms <FaArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestRooms.map((room) => (
            <AllRooms key={room._id} room={room} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/rooms" className="btn btn-primary w-full text-white">
            Show All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeRoomPage;

