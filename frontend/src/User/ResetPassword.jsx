import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { error, loading, success } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        // Check if passwords match before dispatching
        if (password !== confirmPassword) {
            toast.error("New password and confirm password do not match", { 
                position: "top-center", 
                autoClose: 3000 
            });
            return;
        }

        const userData = {
            password,
            confirmPassword
        };

        dispatch(resetPassword({ token, userData }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Password Reset Successfully", { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());
            navigate("/login"); // Redirect to login page after successful reset
        }
    }, [dispatch, error, success, navigate]);

    return (
        <>
            <Navbar />
            <PageTitle title="Reset Password" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
                        Reset Password
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                        <form className="space-y-6" onSubmit={resetPasswordSubmit}>
                            
                            {/* New Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">
                                    New Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Confirm New Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">
                                    Confirm New Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Enter confirm new password"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-200 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]"
                                >
                                    Reset Password
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;