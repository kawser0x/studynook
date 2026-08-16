import Image from "next/image";
import Link from "next/link";
import {
  FaLayerGroup,
  FaUserFriends,
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";

const RoomDetails = async ({ params }) => {
  const { id } = await params;

  let room = null;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${id}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      room = await res.json();
    }
  } catch (error) {
    toast("Error fetching room details:", error)
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
    hourlyRate,
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

          <Link
            href={`/rooms/${id}/edit`}
            className="btn btn-outline btn-sm gap-2 hover:bg-primary hover:text-white">
            <FaEdit className="h-3.5 w-3.5" /> Edit Room
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
            <div className="sticky top-24 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl">
              <div className="flex items-baseline justify-between border-b border-base-300 pb-4">
                <div>
                  <span className="text-3xl font-extrabold text-primary">
                    ${hourlyRate}
                  </span>
                  <span className="text-sm text-base-content/60"> / hour</span>
                </div>
                <div className="badge badge-success badge-sm text-white">
                  Available
                </div>
              </div>

              <div className="space-y-3 py-5 text-xs text-base-content/70">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FaLayerGroup className="text-primary" /> Location
                  </span>
                  <span className="font-semibold text-base-content">
                    {floor}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FaUserFriends className="text-primary" /> Capacity
                  </span>
                  <span className="font-semibold text-base-content">
                    {seatCapacity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" /> Access
                  </span>
                  <span className="font-semibold text-base-content">
                    Instant Booking
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href={`/rooms/${id}/book`}
                  className="btn btn-primary w-full text-white shadow-md shadow-primary/20 hover:brightness-105">
                  Book Now
                </Link>

                <Link
                  href={`/rooms/${id}/edit`}
                  className="btn btn-neutral w-full gap-2 text-white">
                  <FaEdit className="h-3 w-3" /> Edit Room Details
                </Link>

                <p className="text-center text-[11px] text-base-content/60">
                  Free cancellation up to 1 hour before reservation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
