const express = require("express");
const router = express.Router();
const { submitContact } = require("../controllers/contactController");

router.post("/", submitContact);

router.get("/", (req, res) => {
  res.json({ message: "Contact API running. Use POST to send data." });
});

module.exports = router;