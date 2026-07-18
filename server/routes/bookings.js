const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const optionalAuth = require("../middleware/optionalAuth");
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} = require("../controllers/bookingController");

// GET /api/bookings/mine — must be declared before /:id so it isn't
// swallowed by the dynamic id route
router.get("/mine", authMiddleware, getMyBookings);

// POST /api/bookings — guests can book too; logged-in bookings get linked
// to the account automatically
router.post("/", optionalAuth, createBooking);

// GET /api/bookings/:id
router.get("/:id", authMiddleware, getBookingById);

// PATCH /api/bookings/:id/cancel
router.patch("/:id/cancel", authMiddleware, cancelBooking);

module.exports = router;
