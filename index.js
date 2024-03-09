import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import CustomerRoute from "./routes/CustomerRoute.js";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth/authRoute.js";

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("MongoDB connected"));

// Middleware
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Change to true if serving over HTTPS
    },
  })
);

// Routes
app.use(CustomerRoute);
app.use(AuthRoute);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
