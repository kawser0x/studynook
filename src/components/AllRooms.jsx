import Image from "next/image";
import Link from "next/link";
import { FaUserFriends, FaLayerGroup } from "react-icons/fa";

const AllRooms = ({ room }) => {
  const {
    _id,
    name,
    image,
    shortDescription,
    floor,
    seatCapacity,
    hourlyRate,
    amenities = [],
  } = room;

  const visibleAmenities = amenities.slice(0, 3);
  const remainingCount = amenities.length - 3;

  return (
    <div className="card border border-base-300 bg-base-200/60 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <figure className="relative h-48 w-full overflow-hidden bg-base-300">
        <Image
          src={
            image ||
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
          }
          alt={name || "Study Room"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />

        <span className="absolute top-3 right-3 z-10 rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-content shadow">
          ${hourlyRate}/hr
        </span>
      </figure>

      <div className="card-body p-5 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-lg font-bold text-base-content line-clamp-1">
            {name}
          </h2>

          <p className="mt-1 text-xs text-base-content/70 line-clamp-2 min-h-[32px]">
            {shortDescription}
          </p>

          <div className="mt-3 flex items-center justify-between border-y border-base-300/80 py-2 text-xs text-base-content/80">
            <span className="flex items-center gap-1.5 font-medium">
              <FaLayerGroup className="text-primary" /> {floor}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <FaUserFriends className="text-primary" /> {seatCapacity}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {visibleAmenities.map((amenity, index) => (
              <span
                key={index}
                className="badge badge-outline badge-accent text-[11px] py-2 px-2">
                {amenity}
              </span>
            ))}
            {remainingCount > 0 && (
              <span className="badge badge-ghost text-[11px] py-2 px-2 text-base-content/60">
                +{remainingCount} more
              </span>
            )}
          </div>
        </div>

        <div className="card-actions mt-4 pt-2">
          <Link
            href={`/rooms/${_id}`}
            className="btn btn-primary btn-sm w-full text-white">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
