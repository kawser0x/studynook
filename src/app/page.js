import Hero from "@/components/Hero";
import HomeRoomPage from "./homeroom/page";
import RatingPage from "./rating/page";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Home | StudyNook - Reserve Focus Study Rooms",
  description:
    "Find and book modern, quiet acoustic study pods, team rooms, and collaborative hubs with instant reservation.",
};

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HomeRoomPage />
      <RatingPage />
    </div>
  );
}

