import express from "express";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });
import payment from "./routes/paymentRoutes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Middleware to parse cookies
app.use(cookieParser());
// Middleware to handle file uploads
app.use(fileUpload());


// Routes
app.use("/api/v1/", product);
app.use("/api/v1/", user);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);

// Error Middleware (MUST be placed after all routes)
app.use(errorMiddleware);

export default app;