import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {v2 as cloudinary} from "cloudinary";

// Handle Uncaught Exceptions (Synchronous Errors)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down due to uncaught exception");
    process.exit(1);
});

// Config Environment Variables
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 8000;

// Connect to Database
connectDB();

//Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});

// Handle Unhandled Promise Rejections (Asynchronous Errors like DB connection failure)
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down due to unhandled rejection");
    
    server.close(() => {
        process.exit(1);
    });
});