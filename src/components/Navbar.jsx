"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Theme from "./Theme";
import { FaBookOpen, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
          router.push("/signin");
          router.refresh();
        },
        onError: () => {
          toast.error("Failed to sign out");
        },
      },
    });
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "Add Room", href: "/add-room" },
    { name: "My Bookings", href: "/my-booking" },
  ];

  const navLinks = (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-content font-semibold"
                  : "text-base-content/80 hover:bg-base-200 hover:text-primary"
              }`}>
              {link.name}
            </Link>
          </li>
        );
      })}

      {/* Mobile-Only Auth Links when logged out */}
      {!session && !isPending && (
        <li className="sm:hidden border-t border-base-300 pt-1 mt-1">
          <Link
            href="/signin"
            className={`font-medium transition-colors ${
              pathname === "/signin"
                ? "bg-primary text-primary-content font-semibold"
                : "text-base-content/80 hover:bg-base-200 hover:text-primary"
            }`}>
            Sign In
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-md">
      <div className="navbar mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="navbar-start gap-1">
          {/* Mobile Menu Dropdown */}
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

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-1 py-1 text-base font-bold tracking-tight text-primary sm:text-xl">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-white">
              <FaBookOpen />
            </span>
            <span className="whitespace-nowrap">StudyNook</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm">
            {navLinks}
          </ul>
        </div>

        {/* Auth State & Theme Switcher */}
        <div className="navbar-end gap-1.5 sm:gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-primary" />
          ) : user ? (
            /* Logged In User Profile & Logout */
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm flex items-center gap-2 rounded-full px-2">
                <div className="avatar">
                  <div className="relative h-7 w-7 rounded-full ring ring-primary ring-offset-1 ring-offset-base-100 overflow-hidden">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        className="object-cover"
                        sizes="28px"
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
                <li className="border-t border-base-300 mt-1 pt-1">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-error hover:bg-error/10">
                    <FaSignOutAlt className="h-3.5 w-3.5" /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="btn btn-primary btn-xs font-medium text-white  sm:inline-flex sm:btn-sm">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn btn-accent btn-xs text-white shadow-sm hover:opacity-90 sm:btn-sm">
                Sign Up
              </Link>
            </>
          )}

          <Theme />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
