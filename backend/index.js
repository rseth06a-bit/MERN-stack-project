import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import authRoute from './routes/authRoute.js';

// routes
import booksRoute from "./routes/booksRoute.js";
import authRoutes from "./routes/authRoute.js";

// middleware
import { authMiddleware } from "./middleware/auth.js";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS
app.use(cors());

// Health check
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN stack tutorial");
});

// Routes
app.use("/books", booksRoute);
app.use("/api/auth", authRoutes);

// Example of a protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you accessed a protected route!` });
});

// MongoDB connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("✅ App connected to database");
    app.listen(PORT, () => {
      console.log(`🚀 App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
