// app/rooms/page.jsx
// Adjust path based on where you saved it

import RoomsClient from "@/components/RoomsClient";

// Metadata works perfectly here because this is a Server Component!
export const metadata = {
  title: "StudyNook - All Rooms",
  description: "Rooms are shown type by type",
};

export default function RoomsPage() {
  return <RoomsClient />;
}
