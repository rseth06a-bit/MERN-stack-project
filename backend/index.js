import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";
import authRoutes from "./routes/authRoute.js";
import { authMiddleware } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health check
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN stack tutorial");
});

// API routes
app.use("/books", booksRoute);
app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you accessed a protected route!` });
});

// Serve frontend build (after you run `npm run build` in frontend)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// MongoDB connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("✅ App connected to database");
    app.listen(PORT, () => console.log(`🚀 App listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
