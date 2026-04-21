import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Assuming path based on standard structure shown
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile, removeErrors, removeSuccess, loadUser } from "../features/user/userSlice";
import toast from "react-hot-toast";

const UpdateProfile = () => {
    const { user, error, success, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [preview, setPreview] = useState("../assets/profile.jpg");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar?.url) {
                setPreview(user.avatar.url);
            }
        }

        if (error) {
            toast.error(error, { position: "top-center", autoClose: 3000 });
            dispatch(removeErrors());
        }

        if (success) {
            toast.success("Profile updated successfully", { position: "top-center", autoClose: 3000 });
            dispatch(loadUser());
            navigate("/profile");
            dispatch(removeSuccess());
        }

    }, [user, dispatch, error, success, navigate]);

    const handleChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreview(reader.result);
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        if (avatar) {
            myForm.set("avatar", avatar);
        }
        
        dispatch(updateProfile(myForm));
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Update Profile</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={updateProfileSubmit}>
                            
                            {/* Profile Image Preview & Upload */}
                            <div className="flex flex-col items-center">
                                <img src={preview} alt="Avatar Preview" className="h-24 w-24 rounded-full object-cover mb-4" />
                                <label className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    Change Photo
                                    <input type="file" name="avatar" accept="image/*" onChange={handleChange} className="hidden" />
                                </label>
                            </div>

                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <div className="mt-1">
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <div className="mt-1">
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Update Details
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;