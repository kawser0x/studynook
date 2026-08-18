# StudyNook – Library Study Room Booking Platform

**Live Site URL:** [https://studynook.vercel.app](https://studynook.vercel.app)  
**Client Repository:** [https://github.com/kawser0x/studynook](https://github.com/kawser0x/studynook)  
**Server Repository:** [https://github.com/kawser0x/studynook-server](https://github.com/kawser0x/studynook-server)

StudyNook is a full-stack web application designed for students and library members to list, discover, search, filter, and reserve private study rooms and collaborative hubs. Equipped with automated time-conflict prevention, owner-only listing controls, JWT HTTP-only cookie security, and personal booking management dashboards.

---

## Key Features

- **Automated Double-Booking & Conflict Prevention**: Implements real-time time slot validation (`$gte` and `$lte` overlap checks) to ensure rooms are never double-booked for the same time slot.
- **Secure JWT Authentication with HTTP-Only Cookies**: User authentication via email/password and Google OAuth, storing secure JWT tokens in HTTP-only cookies (`httpOnly: true`, `secure: true`, `sameSite: 'strict'`).
- **Comprehensive Room Listing & Owner Controls**: Authenticated users can list new study spaces with customizable amenities (Whiteboard, Projector, Wi-Fi, Power Outlets, Quiet Zone, AC). Edit and Delete controls are strictly scoped to room owners.
- **Advanced Search & Multi-Criteria Filtering**: Filter available study spaces dynamically on the `/rooms` page using room name search (`$regex`), amenity chips (`$in`), hourly rate ranges (`$gte`/`$lte`), and floor levels.
- **Personal Booking & Reservation Management**: Every user enjoys a `/my-bookings` dashboard to track reservation statuses (`confirmed` vs `cancelled`), compute total hourly costs in real-time, and execute one-click cancellations for future dates.
- **Responsive Dark/Light Theme & Framer Motion Animations**: Fully responsive layout across mobile, tablet, and desktop views with persistent dark/light theme toggles and smooth Framer Motion page transitions.

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, DaisyUI, Framer Motion, React Toastify, React Icons
- **Backend**: Node.js, Express 5, MongoDB Driver, Jose (JWT), Cookie Parser, CORS
- **Authentication**: Better Auth & JWT HTTP-Only Cookies

---

## Getting Started Locally

### 1. Server Setup (`studynook-server`)
```bash
cd studynook-server
npm install
npm run start
```

### 2. Client Setup (`studynook`)
```bash
cd studynook
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
