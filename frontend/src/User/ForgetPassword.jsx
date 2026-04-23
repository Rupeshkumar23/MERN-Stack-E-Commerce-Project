import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword, removeErrors, removeSuccess } from '../features/user/userSlice';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");

    const { error, loading, success, message } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const forgetPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword({ email }));
    };

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeErrors());
        }

        if (success) {
            toast.success(message, { position: "top-center", autoClose: 3000 });
            dispatch(removeSuccess());
            setEmail(""); // Clear the input after success
        }
    }, [dispatch, error, success, message]);

    return (
        <>
            <Navbar />
            <PageTitle title="Forget your password" />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 drop-shadow-sm">
                        Forget Password
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                        <form className="space-y-6" onSubmit={forgetPasswordSubmit}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 ml-1">
                                    Email Address
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="hello@example.com"
                                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-200 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-[0.98]"
                                >
                                    Send reset link
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;