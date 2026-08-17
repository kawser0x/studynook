import Link from "next/link";
import { FaCompass, FaHome, FaDoorOpen } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-base-100 px-4 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
  
        <div className="relative mb-6 inline-flex">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner">
            <FaCompass className="h-12 w-12 animate-spin text-primary [animation-duration:8s]" />
          </div>
          <span className="badge badge-error absolute -top-2 -right-2 text-xs font-bold text-white shadow-sm">
            404
          </span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-base-content sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
          Sorry, we couldn’t find the study space or page you are looking for. It might have been moved or removed.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="btn btn-primary btn-sm gap-2 text-white shadow-md shadow-primary/20 hover:brightness-105"
          >
            <FaHome className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <Link
            href="/rooms"
            className="btn btn-outline btn-sm gap-2"
          >
            <FaDoorOpen className="h-3.5 w-3.5" /> Browse Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}