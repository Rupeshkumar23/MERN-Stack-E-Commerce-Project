import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Routes
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);

// Error Middleware (MUST be placed after all routes)
app.use(errorMiddleware);

export default app;