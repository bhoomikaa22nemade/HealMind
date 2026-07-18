const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "..", "data", "counsellors.json");

function loadCounsellors() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

// GET /api/counsellors?search=&specialization=&sort=
exports.getAllCounsellors = (req, res) => {
  try {
    let counsellors = loadCounsellors();
    const { search, specialization, sort } = req.query;

    // ---- Search by name or specialization ----
    if (search && search.trim() !== "") {
      const term = search.trim().toLowerCase();
      counsellors = counsellors.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.specialization.toLowerCase().includes(term)
      );
    }

    // ---- Filter by specialization category ----
    if (specialization && specialization.toLowerCase() !== "all") {
      counsellors = counsellors.filter(
        (c) => c.specialization.toLowerCase() === specialization.toLowerCase()
      );
    }

    // ---- Sort ----
    if (sort === "rating") {
      counsellors = [...counsellors].sort((a, b) => b.rating - a.rating);
    } else if (sort === "experience") {
      counsellors = [...counsellors].sort((a, b) => b.experience - a.experience);
    }

    res.status(200).json({
      success: true,
      count: counsellors.length,
      data: counsellors,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load counsellors" });
  }
};

// GET /api/counsellors/:id
exports.getCounsellorById = (req, res) => {
  try {
    const counsellors = loadCounsellors();
    const counsellor = counsellors.find((c) => c.id === Number(req.params.id));

    if (!counsellor) {
      return res.status(404).json({ success: false, message: "Counsellor not found" });
    }

    res.status(200).json({ success: true, data: counsellor });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to load counsellor" });
  }
};
