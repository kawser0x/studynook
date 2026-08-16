import Hero from "@/components/Hero";
import HomeRoomPage from "./homeroom/page";
import RatingPage from "./rating/page";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <HomeRoomPage />
      <RatingPage />
    </div>
  );
}
