import HandleError from "../helper/handleError.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //  MongoDB Duplicate Key Error (For duplicate emails)
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0]; // Extract the key (e.g., 'email')
    const message = `This ${key} is already registered`;
    err = new HandleError(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};