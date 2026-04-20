import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { register, removeErrors, removeSuccess } from '../features/user/userSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, loading } = useSelector((state) => state.user);

  const [preview, setPreview] = useState("https://ui-avatars.com/api/?name=User&background=random");
  const [avatar, setAvatar] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerNow = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill out all the required fields", { position: "top-center", autoClose: 3000 });
      return;
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Registration Successful", { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <form encType="multipart/form-data" className="space-y-6" onSubmit={registerNow}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-sm text-gray-500 mt-2">Join us and start your journey</p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1 block">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              value={name}
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1 block">Email</label>
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 ml-1 block">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img id="preview" src={preview} alt="" className="h-12 w-12 object-cover rounded-sm bg-gray-100" />
              </div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </label>
            </div>
          </div>

          <div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign in Here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;