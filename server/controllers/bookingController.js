const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const COUNSELLORS_PATH = path.join(__dirname, "..", "data", "counsellors.json");
const BOOKINGS_PATH = path.join(__dirname, "..", "data", "bookings.json");

const PLATFORM_FEE_RATE = 0.05; // 5% convenience/platform fee
const TAX_RATE = 0.18; // 18% GST, shown as a line item on the receipt

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function loadCounsellors() {
  return JSON.parse(fs.readFileSync(COUNSELLORS_PATH, "utf-8"));
}

function loadBookings() {
  try {
    const raw = fs.readFileSync(BOOKINGS_PATH, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(BOOKINGS_PATH, JSON.stringify(bookings, null, 2));
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function buildReceiptNo(sequence) {
  const year = new Date().getFullYear();
  return `MW-${year}-${String(sequence).padStart(5, "0")}`;
}

// POST /api/bookings
// Works for both guests and logged-in users (optionalAuth). If a valid JWT
// was sent, the booking is linked to that account so it shows up on their
// "My Bookings" page with a full receipt.
exports.createBooking = (req, res) => {
  const { counsellorId, name, email, phone, date, time, mode, notes } = req.body;

  const errors = {};
  if (!name || !name.trim()) errors.name = "Name is required";
  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Enter a valid email address";
  }
  if (!date || !date.trim()) errors.date = "Preferred date is required";
  if (!time || !time.trim()) errors.time = "Preferred time is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, message: "Validation failed", errors });
  }

  let counsellor = null;
  try {
    const counsellors = loadCounsellors();
    counsellor = counsellors.find((c) => c.id === Number(counsellorId)) || null;
  } catch (err) {
    // non-fatal — handled by the null check below
  }

  if (!counsellor) {
    return res.status(404).json({ success: false, message: "Selected counsellor could not be found" });
  }

  const bookings = loadBookings();

  const fee = counsellor.fee;
  const platformFee = round2(fee * PLATFORM_FEE_RATE);
  const tax = round2((fee + platformFee) * TAX_RATE);
  const total = round2(fee + platformFee + tax);

  const booking = {
    id: crypto.randomUUID(),
    receiptNo: buildReceiptNo(bookings.length + 1),
    userId: req.user ? req.user.id : null,
    counsellorId: counsellor.id,
    counsellorName: counsellor.name,
    counsellorSpecialization: counsellor.specialization,
    counsellorImage: counsellor.image || null,
    name: name.trim(),
    email: email.trim(),
    phone: phone ? String(phone).trim() : "",
    date,
    time: time.trim(),
    mode: mode === "In-Person" ? "In-Person" : "Online",
    notes: notes ? String(notes).trim() : "",
    fee,
    platformFee,
    tax,
    total,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  saveBookings(bookings);

  return res.status(201).json({
    success: true,
    message: "Session booked successfully!",
    booking,
  });
};

// GET /api/bookings/mine  (protected)
exports.getMyBookings = (req, res) => {
  const bookings = loadBookings();
  const mine = bookings
    .filter((b) => b.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.status(200).json({ success: true, count: mine.length, data: mine });
};

// GET /api/bookings/:id  (protected)
exports.getBookingById = (req, res) => {
  const bookings = loadBookings();
  const booking = bookings.find((b) => b.id === req.params.id);

  if (!booking) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }
  if (booking.userId !== req.user.id) {
    return res.status(403).json({ success: false, message: "You don't have access to this booking" });
  }

  return res.status(200).json({ success: true, data: booking });
};

// PATCH /api/bookings/:id/cancel  (protected)
exports.cancelBooking = (req, res) => {
  const bookings = loadBookings();
  const index = bookings.findIndex((b) => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Booking not found" });
  }
  if (bookings[index].userId !== req.user.id) {
    return res.status(403).json({ success: false, message: "You don't have access to this booking" });
  }
  if (bookings[index].status === "Cancelled") {
    return res.status(400).json({ success: false, message: "Booking is already cancelled" });
  }

  bookings[index].status = "Cancelled";
  bookings[index].cancelledAt = new Date().toISOString();
  saveBookings(bookings);

  return res.status(200).json({ success: true, message: "Booking cancelled", data: bookings[index] });
};
