const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// Same idea as authMiddleware, but a missing/invalid token is not an error —
// it just means the request continues as a guest (req.user stays undefined).
// Used on POST /api/bookings so both logged-in users and guests can book,
// while logged-in bookings get linked to the account for the Bookings page.
module.exports = function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      // ignore invalid/expired token — proceed as guest
    }
  }

  next();
};