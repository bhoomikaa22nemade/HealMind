# Counsellor Directory 🧠💙

A full-stack MERN-style application where users can browse counsellors, search, filter by
specialization, sort by rating/experience, register/login, and book a counselling session
through a validated form.

- **Frontend:** React (Vite), React Router, Axios, plain CSS (light-blue + white theme, Georgia serif)
- **Backend:** Node.js + Express
- **Data:** JSON file storage (`server/data/counsellors.json`, `server/data/users.json`) —
  easy to swap for MongoDB later (see "Switching to MongoDB" below).

---

## 1. Project Structure

```
Counsellor-Directory/
├── client/                      (React Frontend)
│   ├── public/
│   ├── src/
│   │   ├── assets/counsellor-images/
│   │   ├── components/
│   │   │     Navbar.jsx
│   │   │     SearchBar.jsx
│   │   │     FilterButtons.jsx
│   │   │     SortDropdown.jsx
│   │   │     CounsellorCard.jsx
│   │   │     BookingModal.jsx
│   │   │     Footer.jsx
│   │   ├── context/
│   │   │     AuthContext.jsx
│   │   ├── pages/
│   │   │     Home.jsx
│   │   │     Login.jsx
│   │   │     Register.jsx
│   │   ├── services/
│   │   │     api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/                      (Node + Express Backend)
│   ├── routes/
│   │     counsellors.js
│   │     auth.js
│   │     bookings.js
│   ├── controllers/
│   │     counsellorController.js
│   │     authController.js
│   │     bookingController.js
│   ├── middleware/
│   │     authMiddleware.js
│   ├── data/
│   │     counsellors.json
│   │     users.json
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 2. Running the Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev        # nodemon, auto-restarts
# or
npm start
```

The API will run at **http://localhost:5000**

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/counsellors` | Get all counsellors. Supports `?search=`, `?specialization=`, `?sort=rating\|experience` |
| GET | `/api/counsellors/:id` | Get a single counsellor |
| POST | `/api/auth/register` | Register a new user `{ name, email, password }` |
| POST | `/api/auth/login` | Login `{ email, password }` → returns JWT token |
| GET | `/api/auth/me` | Get logged-in user (requires `Authorization: Bearer <token>`) |
| POST | `/api/bookings` | Book a session `{ counsellorId, name, email, date }` (validated, not persisted — per spec) |

## 3. Running the Frontend

Open a **second terminal**:

```bash
cd client
npm install
npm run dev
```

The app will run at **http://localhost:5173** and is already configured (via `src/services/api.js`)
to talk to the backend at `http://localhost:5000/api`.

> Make sure the backend is running first, otherwise counsellor data won't load.

## 4. Switching to MongoDB (optional)

The JSON-file layer lives entirely in `server/controllers/*.js`. To move to MongoDB:

1. `npm install mongoose` in `server/`.
2. Create `server/models/Counsellor.js` and `server/models/User.js` with Mongoose schemas
   matching the JSON shape already used.
3. Replace the `fs.readFileSync(...)` calls in the controllers with the equivalent
   `Model.find()`, `Model.findById()`, `Model.create()` calls.
4. Add `MONGO_URI` to `.env` and connect in `server.js` with `mongoose.connect(...)`.

Because the frontend only talks to the REST endpoints (never touches the data files
directly), **no frontend code needs to change**.

## 5. Test Login

Since there's no seeded user, just use the **Register** page once to create an
account, then log in with the same email/password. Booking a session does **not**
require login — it's open to everyone, as per the original spec.

## 6. Notes

- Bookings are validated on both client and server but intentionally **not saved**
  to disk/DB, per the project brief ("No database storage is needed for bookings").
- Profile images use placeholder avatars from `pravatar.cc` (no local image assets needed,
  keeps the repo lightweight). Swap the URLs in `server/data/counsellors.json` for your own
  images any time — just drop files into `client/src/assets/counsellor-images/` and reference them.
