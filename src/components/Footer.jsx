import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-200/50 text-base-content">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
      
          <div className="space-y-3 md:col-span-1 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-primary">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </span>
              StudyNook
            </Link>
            <p className="text-sm text-base-content/70">
              Your quiet sanctuary for focused study, collaborative group work,
              and academic success.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content">
              Useful Links
            </h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="transition-colors hover:text-primary">
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                Email:{" "}
                <a
                  href="support@studynook.com"
                  className="hover:text-primary">
                  support@studynook.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="" className="hover:text-primary">
                  +8801823-456798
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-3 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base-content transition-colors hover:bg-primary hover:text-white">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base-content transition-colors hover:bg-primary hover:text-white">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base-content transition-colors hover:bg-primary hover:text-white">
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-base-300 text-base-content transition-colors hover:bg-primary hover:text-white">
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-base-300 pt-6 text-center text-xs text-base-content/60">
          <p>© {new Date().getFullYear()} StudyNook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
