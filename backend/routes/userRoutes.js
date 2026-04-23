import express from "express";
import { registerUser, loginUser, logout, forgetPassword, resetPassword, profile, updatePassword, updateProfile, getUsers, getSingleUser, updateUserRole, deleteUser } from "../controllers/userController.js";
import { roleBasedAccess, verifyUser } from "../helper/userAuth.js";

const router = express.Router();

// Route for User Registration
router.route("/register").post(registerUser);

// Route for User Login
router.route("/login").post(loginUser);

// Route for User Logout
router.route("/logout").get(logout);

// Route for Password Forget (This triggers the email to be sent)
router.route("/password/forget").post(forgetPassword);

// Route for Password Reset (This actually updates the password when they click the email link)
router.route("/reset/:token").put(resetPassword);
// Route for User Profile (Protected Route, user must be logged in to access their profile)
router.route('/profile').get(verifyUser, profile);
// Route for Password Update (User must be logged in to update their password)
router.route('/password/update').put(verifyUser, updatePassword);
// Route for Profile Update (User must be logged in to update their profile)
router.route('/profile/update').put(verifyUser, updateProfile);

// Admin Routes
router.route("/admin/users").get(verifyUser, roleBasedAccess("admin"), getUsers);

router.route("/admin/user/:id")
    .get(verifyUser, roleBasedAccess("admin"), getSingleUser)
    .put(verifyUser, roleBasedAccess("admin"), updateUserRole)
    .delete(verifyUser, roleBasedAccess("admin"), deleteUser);

export default router;