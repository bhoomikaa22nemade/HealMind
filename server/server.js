require("dotenv").config();
const express = require("express");
const cors = require("cors");

const counsellorRoutes = require("./routes/counsellors");
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// ---- Middleware ----
app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// ---- Simple request logger (handy for demos) ----
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

// ---- Health check ----
app.get("/", (req, res) => {
  res.json({ message: "Counsellor Directory API is running 🚀" });
});

// ---- Routes ----
app.use("/api/counsellors", counsellorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// ---- 404 handler ----
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ---- Global error handler ----
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
