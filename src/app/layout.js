import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StudyNook - Find & Book Private Study Spaces",
    template: "%s | StudyNook",
  },
  description:
    "Discover, reserve, and manage quiet study pods, team rooms, and collaborative hubs with ease.",
  keywords: [
    "study rooms",
    "book study pod",
    "university study space",
    "quiet study area",
    "StudyNook",
  ],
  openGraph: {
    title: "StudyNook - Find & Book Private Study Spaces",
    description:
      "Book quiet rooms and dedicated study spaces effortlessly with real-time availability.",
    siteName: "StudyNook",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
