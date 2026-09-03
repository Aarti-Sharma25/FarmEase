# FarmEase 🚜

A peer-to-peer agricultural equipment rental marketplace, built on the MERN stack — farmers can list equipment they own for rent, and browse/rent equipment listed by others, with AI-assisted listing creation and semantic search.

---

## ✨ Features

### 🏪 Core Marketplace
- User authentication (signup, login, email verification, password reset) using JWT (httpOnly cookies)
- Add, browse, and delete equipment rental listings
- Image upload via Cloudinary (in-memory upload, no local disk storage)
- Category-based filtering (tractors, harvesters, plows, irrigation, planters)
- Rent checkout flow
- Responsive UI (desktop + mobile)

### 🤖 AI-Powered Features
- **AI-Generated Listing Descriptions** — Generates a short, farmer-friendly rental description from an equipment name and a few keywords, powered by the Gemini LLM API. Saves users from writing listing copy themselves.
- **Semantic Equipment Search** — Search listings by meaning rather than exact keyword match, using Gemini text embeddings and cosine similarity, so a query like "something to till hard soil" can surface a relevant plow even without an exact keyword match.

Embeddings are generated when a listing is created and stored alongside it; if the embedding call fails (e.g. API hiccup), the listing still saves normally and simply won't surface in semantic search until re-indexed.

---

## 🛠️ Tech Stack

**Frontend:** React, Redux Toolkit, React Router, Tailwind CSS, Axios, Framer Motion

**Backend:** Node.js, Express, MongoDB (Mongoose)

**Auth & Storage:** JWT (httpOnly cookies), Cloudinary (image storage), Brevo (transactional email)

**AI:** Google Gemini API (`gemini-3.6-flash` for description generation, `gemini-embedding-001` for embeddings)

---

## 📁 Project Structure

```
FarmEase/
├── backend/
│   ├── controllers/       # Route handlers (auth, rental, ai)
│   ├── db/                 # MongoDB connection
│   ├── middleware/          # Auth middleware
│   ├── models/              # Mongoose schemas (User, RentalEquipment)
│   ├── routes/               # Express routers
│   ├── utils/                 # Cloudinary upload, embeddings/cosine similarity
│   └── index.js                # App entrypoint
├── frontend/
│   └── src/
│       ├── pages/            # Route-level components
│       ├── store/             # Redux Toolkit store + slices
│       └── App.jsx
└── package.json               # Backend deps (run from repo root)
```

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js and npm
- A MongoDB connection string (local or Atlas)
- A Google Gemini API key
- A Cloudinary account (cloud name, API key, API secret)
- A Brevo account for transactional email (optional, for email verification/reset flows)

### 1️⃣ Clone the repo
```bash
git clone https://github.com/Aarti-Sharma25/FarmEase.git
cd FarmEase
```

### 2️⃣ Backend setup
Install dependencies from the **repo root** (the backend `package.json` lives there, not inside `/backend`):
```bash
npm install
```

Create a `.env` file at the repo root with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

GEMINI_API_KEY=your_gemini_api_key

BREVO_API_KEY=your_brevo_api_key
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

Start the backend:
```bash
npm run dev
```

### 3️⃣ Frontend setup
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on Vite's default dev server (`http://localhost:5173`) and expects the backend on the port set in `.env`.

---

## 🔌 API Overview

| Route | Description |
|---|---|
| `/api/auth/*` | Signup, login, logout, email verification, password reset, profile |
| `/api/rentals` | `GET` list all / `POST` create listing / `DELETE /:id` remove listing |
| `/api/rentals/search?q=` | Semantic search over listings |
| `/api/ai/generate-description` | AI-generated listing description from equipment name + keywords |

---

## 📝 Notes

- AI features are triggered on-demand (button click / search submit), not automatically, to keep API usage predictable.
- Semantic search currently scores similarity in-memory (brute-force cosine similarity) rather than a dedicated vector index — a reasonable trade-off at the current listing volume; a managed vector search index would be the natural next step at scale.
