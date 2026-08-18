# 📚 StudyNook – Library Study Room Booking Platform

**Live Website URL:** [https://studynook-hazel.vercel.app/](https://studynook-hazel.vercel.app/)  
**Frontend GitHub Repository:** [https://github.com/kawser0x/studynook](https://github.com/kawser0x/studynook)  
**Backend GitHub Repository:** [https://github.com/kawser0x/studynook-server](https://github.com/kawser0x/studynook-server)

StudyNook is a modern full-stack web application designed for university students and library users to browse, search, filter, and reserve private study rooms and collaborative hubs. Built with Next.js App Router and an Express/MongoDB backend, the platform features automated time-conflict prevention, owner-only listing management, secure JWT authentication in HTTP-only cookies, and personalized reservation dashboards.

---

## ✨ Key Features

- 🔐 **Secure JWT Authentication & HTTP-Only Cookies**: Supports email/password registration and Google OAuth sign-in, persisting session tokens securely in HTTP-only cookies (`httpOnly: true`, `secure: true`, `sameSite: 'strict'`).
- 🛡️ **Automated Time-Conflict Detection**: Real-time reservation engine checking overlapping time slots (`$gte` and `$lte`) to guarantee zero double-booking for any reserved room and date.
- ⚙️ **Strict Owner-Only Listing Controls**: Room creators can list study spaces with customizable amenities (Whiteboard, Projector, Wi-Fi, Power Outlets, Quiet Zone, Air Conditioning). Edit and Delete controls are strictly scoped to room owners.
- 🔍 **Advanced Multi-Criteria Search & Filtering**: Dynamically filter available study spaces on the `/rooms` page using room name search (`$regex`), amenity chips (`$in`), hourly rate range (`$gte`/`$lte`), and floor levels.
- 📋 **Personal Reservation Dashboard (`/my-bookings`)**: View active reservations with real-time hourly cost calculation, status badges (`confirmed` in green, `cancelled` in red), and one-click cancellation with `$pull` database sync.
- 🏢 **My Listings Management (`/my-listings`)**: A dedicated dashboard for room owners to manage, update details, or delete their listed study spaces.
- 🎨 **Responsive Dark/Light Theme & Framer Motion**: Fully responsive layout across mobile, tablet, and desktop views with persistent dark/light theme toggles and smooth Framer Motion page transitions.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Styling**: Tailwind CSS & DaisyUI 5
- **Animations**: Framer Motion
- **Icons**: React Icons (FaBookOpen, FaXTwitter, etc.)
- **Authentication**: Better Auth & JWT HTTP-Only Cookies
- **Notifications**: React Toastify

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ and npm installed

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kawser0x/studynook.git
   cd studynook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (`.env`):**
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://studynook-server.vercel.app # or http://localhost:5000
   BETTER_AUTH_SECRET=your_auth_secret_key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the MIT License.
