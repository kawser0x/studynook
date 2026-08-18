import Hero from "@/components/Hero";
import HomeRoomPage from "./homeroom/page";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import RatingPage from "./rating/page";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "StudyNook - Home",
  description:
    "Find and book quiet, private study rooms in your library. List your own room and earn.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <HomeRoomPage />
      <WhyChooseUs />
      <HowItWorks />
      <RatingPage />
    </div>
  );
}
