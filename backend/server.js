import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

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