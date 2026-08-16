import Link from "next/link";
import Theme from "./Theme";
import { FaBookOpen } from "react-icons/fa";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <Link
          href="/"
          className="font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary active:bg-primary active:text-primary-content">
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/rooms"
          className="font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary active:bg-primary active:text-primary-content">
          Rooms
        </Link>
      </li>
      <li>
        <Link
          href="/add-room"
          className="font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary">
          Add Room
        </Link>
      </li>
      <li>
        <Link
          href="/my-listings"
          className="font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary">
          My Listings
        </Link>
      </li>
      <li>
        <Link
          href="/my-bookings"
          className="font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary">
          My Bookings
        </Link>
      </li>
      <li className="sm:hidden border-t border-base-300 pt-1 mt-1">
        <Link
          href="/signin"
          className="font-medium text-base-content/80 transition-colors hover:bg-base-200 hover:text-primary">
          Sign In
        </Link>
      </li>
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
          <Link
            href="/signin"
            className="btn btn-primary btn-xs hidden font-medium text-white sm:inline-flex sm:btn-sm">
            Sign In
          </Link>
          <Link
            href="/signout"
            className="btn btn-error btn-xs text-white shadow-sm hover:opacity-90 sm:btn-sm">
            Sign Out
          </Link>
          <Theme />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
