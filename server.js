const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require("./config/connectDB");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("Portfolio Backend Running 🚀");
});

app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});