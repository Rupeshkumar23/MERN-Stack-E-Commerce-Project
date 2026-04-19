export const sendToken = (user, statusCode, res) => {
    // 1. Generate Token
    const token = user.getJwtToken();

    // 2. Options for Cookie
    const options = {
        // Convert days to milliseconds
        expires: new Date(Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000),
        httpOnly: true, // Cannot be accessed via frontend JavaScript
        secure: false   // Set to true if using HTTPS in production
    };

    // 3. Send Response with Cookie
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
};