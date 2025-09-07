# 🌾 FarmEase RentHub

A platform enabling farmers to **rent idle farming equipment** during the off-season, allowing owners to earn additional income while helping others access affordable tools. FarmEase RentHub aggregates equipment listings and connects users through a seamless interface supported by call centers and real-time communication features.

---

## 🐼 Problem Statement

In many regions, expensive farming equipment remains unused during non-seasonal periods, resulting in wasted resources and missed income opportunities. To address this, **FarmEase RentHub** offers a centralized solution that allows farmers to:

* **List unused equipment for rent**
* **Search, filter, and book equipment**
* **Connect with equipment owners**
* **Gain access to affordable tools during the off-season**

---

## ✨ Features

### 🔐 Authentication

* User **Login/Signup**
* **JWT-based authentication** for secure session management
* **OTP verification** for identity confirmation

### 🛆 Equipment Management

* Add equipment with category-based details like:

  * Crop Protection
  * Harvesting Tools
  * Tillage Equipment
* Upload images, availability dates, and pricing info

### 🔍 Search & Filter

* Search equipment using **titles or keywords**
* Filter by:

  * Category
  * Availability
  * Rental Price
  * Location

### 🗓️ Booking & Tracking

* Book equipment for specific dates
* Track current and past booking **status**
* See **rental history**

### 💬 Communication & Support

* Comment and reply system for equipment posts
* **Chat** between owners and customers
* Integrated **Support Center** for assistance

### ↺ Other Utilities

* **LimitOffsetPagination** for efficient equipment browsing
* Admin access for managing users and resolving disputes

---

## 🛠️ Tech Stack (suggested)

**Frontend:**

* React / Vite
* Tailwind CSS
* Axios

**Backend:**

* Node.js + Express.js
* MongoDB
* JWT + OTP 

**Others:**

* Socket.IO (for chat)


---

## 🚀 Getting Started

```bash
# Clone the repositor
git clone https://github.com/Aarti-Sharma25/FarmEase

# Navigate into the project directory
cd Farmease

# Install dependencies
npm install

# Start the backend server
npm run server

# Start the frontend
cd frontend
npm install
npm run dev
```

---

