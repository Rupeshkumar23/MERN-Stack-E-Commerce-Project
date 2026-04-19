import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB Connected with server : ${data.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;