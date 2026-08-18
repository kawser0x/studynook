"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Theme from "./Theme";
import { FaBookOpen, FaSignOutAlt, FaList, FaCalendarCheck, FaPlusCircle } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (backendUrl) {
        await fetch(`${backendUrl}/logout`, { method: "POST" });
      }
    } catch (e) {
      console.error("Logout cookie clear error:", e);
    }

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/login");
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  };

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
  ];

  const privateLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Add Room", href: "/add-room" },
    { name: "My Listings", href: "/my-listings" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const currentLinks = user ? privateLinks : publicLinks;

  const navLinks = (
    <>
      {currentLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "text-base-content/80 hover:bg-base-200 hover:text-primary"
              }`}>
              {link.name}
            </Link>
          </li>
        );
      })}

      {!user && !isPending && (
        <>
          <li className="lg:hidden border-t border-base-300 pt-1 mt-1">
            <Link
              href="/login"
              className={`font-medium ${
                pathname === "/login" ? "bg-primary text-white font-semibold" : ""
              }`}>
              Login
            </Link>
          </li>
          <li className="lg:hidden">
            <Link
              href="/register"
              className={`font-medium ${
                pathname === "/register" ? "bg-primary text-white font-semibold" : ""
              }`}>
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-md">
      <div className="navbar mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="navbar-start gap-1">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-[1] mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {navLinks}
            </ul>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-1 py-1 text-base font-bold tracking-tight text-primary sm:text-xl">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-white">
              <FaBookOpen />
            </span>
            <span className="whitespace-nowrap">StudyNook</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-1.5 sm:gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm flex items-center gap-2 rounded-full px-2">
                <div className="avatar">
                  <div className="relative h-8 w-8 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100 overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral text-[11px] font-bold text-neutral-content">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                  </div>
                </div>
                <span className="hidden text-xs font-semibold text-base-content md:inline-block max-w-[120px] truncate">
                  {user.name}
                </span>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[1] mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                <li className="menu-title border-b border-base-300 pb-2 mb-1">
                  <span className="text-xs font-bold text-base-content truncate">
                    {user.name}
                  </span>
                  <span className="text-[11px] font-normal text-base-content/60 truncate">
                    {user.email}
                  </span>
                </li>
                <li>
                  <Link href="/add-room" className="flex items-center gap-2">
                    <FaPlusCircle className="h-3.5 w-3.5 text-primary" /> Add Room
                  </Link>
                </li>
                <li>
                  <Link href="/my-listings" className="flex items-center gap-2">
                    <FaList className="h-3.5 w-3.5 text-primary" /> My Listings
                  </Link>
                </li>
                <li>
                  <Link href="/my-bookings" className="flex items-center gap-2">
                    <FaCalendarCheck className="h-3.5 w-3.5 text-primary" /> My Bookings
                  </Link>
                </li>
                <li className="border-t border-base-300 mt-1 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-error hover:bg-error/10">
                    <FaSignOutAlt className="h-3.5 w-3.5" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="btn btn-primary btn-xs font-medium text-white sm:btn-sm">
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline btn-primary btn-xs font-medium sm:btn-sm">
                Register
              </Link>
            </div>
          )}

          <Theme />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
