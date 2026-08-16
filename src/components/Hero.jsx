import Link from "next/link";
import {
  FaSearch,
  FaArrowRight,
  FaWifi,
  FaVolumeMute,
  FaClock,
} from "react-icons/fa";

const Hero = () => {
  return (
    <div
      className="hero min-h-[85vh] relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80')`,
      }}>
      <div className="hero-overlay bg-gradient-to-r from-neutral/95 via-neutral/85 to-primary/60" />

      <div className="hero-content text-neutral-content z-10 mx-auto max-w-5xl py-16 px-4 text-center sm:px-6">
        <div className="max-w-3xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md mb-6">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Zero Distractions • Pure Productivity
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Find Your Focus at <span className="text-accent">StudyNook</span>
          </h1>

          <p className="py-6 text-base sm:text-lg text-white/80 max-w-2xl">
            Book quiet acoustic solo booths, tech-ready seminar labs, and shared
            study suites by the hour. Designed specifically for students and
            remote learners.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8 text-xs sm:text-sm text-white/90">
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              <FaVolumeMute className="text-accent" /> Soundproof Pods
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              <FaWifi className="text-accent" /> Gigabit Wi-Fi
            </span>
            <span className="flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              <FaClock className="text-accent" /> Instant Booking
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link
              href="/rooms"
              className="btn btn-primary text-white border-none shadow-lg hover:brightness-110 gap-2 sm:btn-wide">
              <FaSearch className="h-4 w-4" /> Browse Study Rooms
            </Link>
            <Link
              href="/add-room"
              className="btn btn-outline text-white border-white/40 hover:bg-white/10 hover:border-white gap-2 sm:btn-wide">
              Create a Space <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
