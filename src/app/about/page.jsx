import Link from "next/link";
import { FaBookOpen, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

export const metadata = {
  title: "About Us | StudyNook",
  description: "Learn about StudyNook's mission to connect students with quiet, private study spaces.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-2xl text-white shadow-md shadow-primary/30 mb-4">
            <FaBookOpen />
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
            About <span className="text-primary">StudyNook</span>
          </h1>
          <p className="mt-4 text-base text-base-content/70 max-w-2xl mx-auto">
            StudyNook is a full-stack platform enabling university students and library members to list, browse, and instantly reserve private study rooms and collaborative hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="card border border-base-300 bg-base-200/50 p-6 text-center shadow-sm">
            <FaShieldAlt className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content">Conflict Prevention</h3>
            <p className="text-xs text-base-content/70 mt-2">
              Automated time-overlap detection guarantees zero double-booking for reserved time slots.
            </p>
          </div>

          <div className="card border border-base-300 bg-base-200/50 p-6 text-center shadow-sm">
            <FaClock className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content">Flexible Hourly Slots</h3>
            <p className="text-xs text-base-content/70 mt-2">
              Book rooms by the hour with transparent pricing and real-time total cost calculation.
            </p>
          </div>

          <div className="card border border-base-300 bg-base-200/50 p-6 text-center shadow-sm">
            <FaUsers className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-base-content">Community Listings</h3>
            <p className="text-xs text-base-content/70 mt-2">
              List private rooms or study pods you manage and track all your reservations in a unified dashboard.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <Link href="/rooms" className="btn btn-primary text-white btn-md px-8 shadow-md">
            Explore Available Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
