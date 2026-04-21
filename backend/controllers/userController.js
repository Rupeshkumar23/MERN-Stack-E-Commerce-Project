import User from "../models/userModel.js";
import HandleError from "../helper/handleError.js"; 
import { sendToken } from "../helper/jwtToken.js"; 
import { sendEmail } from "../helper/sendEmail.js"; 
import crypto from "crypto"; 
import {v2 as cloudinary} from "cloudinary";

// --- REGISTER USER ---
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Basic Validation
    if (!name) {
      return next(new HandleError("Name cannot be empty", 400));
    }
    if (!email) {
      return next(new HandleError("Email cannot be empty", 400));
    }
    if (!password) {
      return next(new HandleError("Password cannot be empty", 400));
    }
 
     const myCloud = await cloudinary.uploader.upload(avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

    // Create the user in the database
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    });

    sendToken(user, 201, res); 

  } catch (error) {
    next(error);
  }
};

// --- LOGIN USER ---
export const loginUser = async (req, res, next) => {
  try { 
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return next(new HandleError("Email or Password cannot be empty", 400));
    }

    // 2. Find user in Database. 
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new HandleError("Invalid Email Id or Password", 401));
    }

    // 3. Verify the password using the method we created in the model
    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      return next(new HandleError("Invalid Email Id or Password", 401));
    }

    // 4. Send Response with Token and Cookie
    sendToken(user, 200, res);

  } catch (error) {
    next(error); 
  }
};

// --- LOGOUT USER ---
export const logout = async(req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
    };
    res.cookie("token", null, options);
    res.status(200).json({ success: true, message: "Successfully logged out" });
};

// --- FORGET PASSWORD (Sends the Email) ---
export const forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return next(new HandleError("User does not exists", 400));
    }

    let resetToken;
    try {
        resetToken = user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        console.log(resetToken);
    } catch (error) {
        console.log(error);
        return next(new HandleError("Could not save reset token, Try again later..", 500));
    }

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/reset/${resetToken}`;

    const messageHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>Hello,</p>
            <p>You requested to reset your password. Click the button below to continue:</p>

            <a href="${resetPasswordURL}" 
               style="display: inline-block; padding: 12px 20px; background: #007bff; color: white; 
                      text-decoration: none; border-radius: 5px; margin-top: 10px;">
                Reset Password
            </a>

            <p style="margin-top: 20px;">
                Or copy and paste this link in your browser:<br>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
            </p>

            <p style="color: red; font-weight: bold;">
                This link will expire in 30 minutes.
            </p>

            <p>If you didn't request a password reset, please ignore this email.</p>

            <br>
            <p>Regards,<br>Your Website Team</p>
        </div>
    </div>
    `;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            htmlMessage: messageHTML
        });
        res.status(200).json({
            success: true,
            message: `Email is sent to ${user.email} successfully`,
        });
    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new HandleError("Email could not be send try again later..", 500));
    }
};

// --- RESET PASSWORD (Changes the Password) ---
export const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    console.log(resetPasswordToken);

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new HandleError("Invalid or reset code expired", 400));
    }

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return next(new HandleError("Password doesn't match please both password", 400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
};

//Get User Profile
export const profile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
};

//Update User Password
export const updatePassword = async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');

    const isCorrect = await user.verifyPassword(oldPassword);

    if (!isCorrect) {
        return next(new HandleError("Incorrect Old Password.", 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new HandleError("Confirm password must be same as new password.", 400));
    }

    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
};

//Update User Profile
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email, avatar } = req.body;

        const updatedUserDetails = { name, email };

        if (avatar) {
            const user = await User.findById(req.user.id);

            // Destroy old avatar if it exists
            if (user.avatar && user.avatar.public_id) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }

            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            updatedUserDetails.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};
//Get All Users
export const getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users,
    });
};

//Get Single User
export const getSingleUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new HandleError("User doesn't exist : ", 400));
    }
    res.status(200).json({
        success: true,
        user,
    });
};

//Update User Role
export const updateUserRole = async (req, res, next) => {
    const { role } = req.body;
    const id = req.params.id;
    const updatedRole = { role };

    const user = await User.findById(id);
    if (!user) {
        return next(new HandleError("User doesn't exist : ", 400));
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedRole, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        user,
    });
};

//Delete User
export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new HandleError("User doesn't exist : ", 400));
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "User details deleted successfully",
    });
};