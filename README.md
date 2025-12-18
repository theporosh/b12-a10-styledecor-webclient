# 🎨 StyleDecor – Smart Home & Ceremony Decoration Booking System

## 📌 Project Name : b12-a10-styledecor-webclient

**StyleDecor**

## 🎯 Purpose

StyleDecor is a full-stack MERN-based smart appointment and decoration service management system designed for local home & ceremony decoration businesses. The platform allows users to explore decoration services, book consultations or on-site services, make secure payments, and track service progress, while admins and decorators manage operations through powerful role-based dashboards.

This project was developed to demonstrate real-world application development, system design, authentication, payments, and dashboard analytics.

---

## 🌐 Live Links

* **Client Live URL:** https://styledecor-e7da4.web.app/

* **Server Live URL:** https://b12-a10-styledecor-webserver.vercel.app/

---

## 🚀 Key Features

### 👤 User Features

* Browse decoration services & packages
* Advanced search & filtering (service name, category, budget range)
* View service details (open route)
* Book consultation or on-site decoration services
* Secure Stripe payment integration
* Booking history with cancellation & updates
* Payment history & receipts
* Track service/project status in real time

### 🛠 Admin Features

* Role-based secure admin dashboard
* Manage Decorators (CRUD)
* Approve / Disable decorator accounts
* Manage Decoration Services & Packages (CRUD)
* Assign decorators for paid on-site services
* Manage all bookings
* Revenue monitoring
* Analytics dashboard

  * Service demand chart
  * Booking histogram

### 🎯 Decorator Features

* View assigned projects
* Today’s work schedule
* Step-by-step project status updates
* Earnings summary
* Payment history check

---

## 🏠 Home Page Highlights

* Animated Hero Section (Framer Motion)
* Dynamic Services Section (server driven)
* Top Decorators section with ratings & specialties
* Service Coverage Map (React Leaflet)
* CTA: **Book Decoration Service**

---

## 🧱 Pages & Layout

### 🔹 Main Pages

* Home
* Services (Search & Filter)
* Service Details (Booking enabled for logged-in users)
* Booking Page
* Payment Page
* Service Coverage Map
* Login / Register
* Error Page (404)
* Global Loading 

### 🔹 Layout Components

* **Navbar**

  * Logo & Brand
  * Home, Services, About, Contact
  * Dashboard (logged-in users)
  * Login / Profile dropdown

* **Footer**

  * Contact info
  * Social media links
  * Business hours
  * Copyright

---

## 🔐 Authentication & Security

* Firebase Authentication
* Email & Password login
* Social login support
* Profile image upload (ImageBB )
* JWT token based authentication
* Role-based route protection (User / Admin / Decorator)
* Secure environment variables (.env)

---

## 💳 Payment System

* Stripe payment integration
* Secure server-side transaction storage
* Payment receipts available in user dashboard

---

## 📊 Dashboard Structure

### 👤 User Dashboard

* My Profile
* My Bookings
* Booking Cancellation
* Payment History

### 🛠 Admin Dashboard

* Manage Decorators
* Manage Services & Packages
* Manage Bookings
* Assign Decorators
* Revenue & Analytics Charts

### 🎯 Decorator Dashboard

* My Assigned Projects
* Today’s Schedule
* Update Project Status
* Earnings Summary

---

---

## 🎨 UI / UX Followed

* Modern DaisyUI + Tailwind CSS design
* Consistent spacing & alignment
* Clean visual hierarchy
* Beautiful accent colors
* No cluttered or low-quality layouts

---

## 📦 NPM Packages Used (Client)

```json
{
  "@tailwindcss/vite": "^4.1.17",
  "@tanstack/react-query": "^5.90.12",
  "axios": "^1.13.2",
  "firebase": "^12.6.0",
  "framer-motion": "^12.23.25",
  "leaflet": "^1.9.4",
  "lucide-react": "^0.560.0",
  "motion": "^12.23.25",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hook-form": "^7.68.0",
  "react-icons": "^5.5.0",
  "react-leaflet": "^5.0.0-rc.2",
  "react-router": "^7.10.1",
  "react-toastify": "^11.0.5",
  "sweetalert2": "^11.26.4",
  "swiper": "^12.0.3",
  "tailwindcss": "^4.1.17"
}
```

---

## 🚀 Deployment Checklist

* No CORS / 404 / 504 errors
* Firebase authorized domains configured
* Private routes persist on reload
* Environment variables secured
* Live client & server fully functional

---


