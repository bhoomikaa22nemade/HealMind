const express = require("express");
const router = express.Router();
const {
  getAllCounsellors,
  getCounsellorById,
} = require("../controllers/counsellorController");

// GET /api/counsellors
router.get("/", getAllCounsellors);

// GET /api/counsellors/:id
router.get("/:id", getCounsellorById);

module.exports = router;
