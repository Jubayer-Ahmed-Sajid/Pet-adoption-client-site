# Paws & Hearts — Pet Adoption & Rescue Crowdfunding Platform

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38bdf8.svg)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-API-635bff.svg)](https://stripe.com/)

A full-stack companion animal adoption and rescue crowdfunding platform connecting certified shelters, foster volunteers, and adopters. Features complete pet lifecycle management, real-time Stripe donation checkout, and role-based administrative moderation.

---

## 🔗 Live Application & Demo Access

* **Live Deployment (Vercel):** [https://paws-and-hearts-js.vercel.app](https://paws-and-hearts-js.vercel.app)
* **Alternative Mirror (Firebase):** [https://pet-adaption-11a4b.web.app](https://pet-adaption-11a4b.web.app)

### 🧪 Recruiter & Reviewer Sandbox Credentials
To evaluate administrative features, user moderation, and full listing controls without creating an account:

* **Role:** Platform Administrator
* **Demo Email:** `sajid661azxcca@gmail.com`
* **Demo Password:** `1234aA!`
* *(Or use the **"Fill Demo Admin"** one-click button on the Sign In page).*

---

## 🌟 Key Features

* **Pet Discovery & Filtering:**
  * Filter companion animals by species (Dogs, Cats, Aquatic, Birds).
  * Real-time search with instant feedback and category chips.
  * Direct adoption application modal recording applicant contact info and housing details.
* **Emergency Crowdfunding & Stripe Payments:**
  * Fund emergency veterinary surgeries, food, and rescue transportation.
  * 3-tier card checkout using Stripe Elements with client-side validation and atomic `$inc` MongoDB balance updates.
* **User & Moderator Dashboards:**
  * **Adopter / Volunteer:** Add pets for adoption (with browser image compression via CompressorJS and ImgBB CDN hosting), view listing statuses, inspect adoption inquiries, and create campaigns.
  * **Administrator:** View and moderate all registered users, elevate user roles, toggle pet availability, and manage active campaigns.
* **Authentication & Authorization:**
  * Firebase Authentication (Email/Password, Google OAuth, GitHub OAuth).
  * Backend JWT token generation issued via secure HTTP-only cookies with role-based route guards (`AdminRoutes`, `PrivateRoutes`).

---

## 🛠️ Tech Stack Architecture

* **Frontend:** React 18, Vite, Tailwind CSS, TanStack React Query v5, TanStack Table v8, Formik, Yup, SweetAlert2, Sonner, React Icons.
* **Backend:** Node.js, Express, MongoDB Native Driver, JSON Web Tokens (`jsonwebtoken`), Cookie Parser, Stripe Node SDK.
* **Cloud & Services:** Firebase Hosting, Firebase Auth, Stripe API, ImgBB Cloud API.

---

## 🚀 Local Development Setup

### 1. Server Configuration
```bash
cd Pet-adoption-server-site
npm install
# Create a .env file with:
# PORT=5000
# DB_USER=your_mongo_user
# DB_PASS=your_mongo_password
# ACCESS_TOKEN_SECRET=your_jwt_secret
# STRIPE_SECRET_KEY=your_stripe_secret
npm start
```

### 2. Client Configuration
```bash
cd Pet-adoption-client-site
npm install
# Create a .env.local file with:
# VITE_APIKEY=your_firebase_key
# VITE_AUTHDOMAIN=your_auth_domain
# VITE_PROJECTID=your_project_id
# VITE_STORAGEBUCKET=your_storage_bucket
# VITE_MESSAGINGSENDERID=your_sender_id
# VITE_APPID=your_app_id
# VITE_PAYMENT_KEY=your_stripe_publishable_key
# VITE_IMAGE_HOSTING_KEY=your_imgbb_key
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
