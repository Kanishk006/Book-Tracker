import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB is connected");
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });

// Book routes
app.use("/api/books", bookRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Book Tracker is running"
    });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});