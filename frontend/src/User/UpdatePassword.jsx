import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword, removeErrors, removeSuccess } from "../features/user/userSlice";
import toast from "react-hot-toast";

const UpdatePassword = () => {
    const { error, success, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }

        dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Password updated successfully", { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/profile");
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
                        Update Password
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-10 px-6 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
                        <form className="space-y-6" onSubmit={updatePasswordSubmit}>
                            
                            {/* Old Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">
                                    Old Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                        placeholder="Enter old password"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* New Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">
                                    New Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        placeholder="Enter new password"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        placeholder="Enter confirm password"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all active:scale-[0.98]"
                                >
                                    Change Password
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;