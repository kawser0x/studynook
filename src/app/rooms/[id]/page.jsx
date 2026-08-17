import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCheckCircle, FaFire } from "react-icons/fa";
import RoomActionCard from "@/components/RoomActionCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://studynook-server-pearl.vercel.app";
    if (id) {
      const res = await fetch(`${backendUrl}/rooms/${id}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const room = await res.json();
        return {
          title: room?.name ? `${room.name} - Room Details` : "Room Details",
          description:
            room?.shortDescription ||
            "View details and reserve this quiet study space.",
        };
      }
    }
  } catch (e) {}

  return {
    title: "Room Details",
    description: "View details and reserve quiet study spaces on StudyNook.",
  };
}

const RoomDetails = async ({ params }) => {
  const { id } = await params;
  let room = null;
  let token = null;

  try {
    const authRes = await auth.api.getToken({
      headers: await headers(),
    });
    token = authRes?.token;
  } catch (e) {
  }

  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://studynook-server-pearl.vercel.app";
    if (id) {
      const headersObj = {};
      if (token) {
        headersObj.authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${backendUrl}/rooms/${id}`, {
        headers: headersObj,
      });
      if (res.ok) {
        room = await res.json();
      }
    }
  } catch (error) {
    console.error("Error fetching room details:", error);
  }

  if (!room) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-base-content">Room Not Found</h2>
        <p className="mt-2 text-sm text-base-content/70">
          The study space you are looking for does not exist or has been
          removed.
        </p>
        <Link href="/rooms" className="btn btn-primary mt-6 text-white">
          Back to All Rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    image,
    shortDescription,
    floor,
    seatCapacity,
    bookingCount = 0,
    amenities = [],
  } = room;

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-medium text-base-content/70 hover:text-primary transition-colors">
            <FaArrowLeft className="h-3 w-3" /> Back to Rooms
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-base-300 sm:h-96">
              <Image
                src={
                  image ||
                  "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
                }
                alt={name || "Study Room"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-primary badge-outline text-xs">
                  {floor}
                </span>
                <span className="badge badge-ghost text-xs">
                  Capacity: {seatCapacity}
                </span>
                {bookingCount > 0 && (
                  <span className="badge badge-warning gap-1 text-xs font-semibold">
                    <FaFire className="h-3 w-3" /> Booked {bookingCount}{" "}
                    {bookingCount === 1 ? "time" : "times"}
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-3xl font-extrabold text-base-content sm:text-4xl">
                {name}
              </h1>
            </div>

            <div className="rounded-xl border border-base-300 bg-base-200/40 p-5">
              <h2 className="text-base font-bold text-base-content">
                About this space
              </h2>
              <p className="mt-2 text-sm text-base-content/80 leading-relaxed whitespace-pre-line">
                {shortDescription}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-base-content mb-3">
                Included Amenities
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border border-base-300 bg-base-200/50 px-3 py-2 text-xs font-medium text-base-content">
                    <FaCheckCircle className="h-3.5 w-3.5 text-success shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <RoomActionCard room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
