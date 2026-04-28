import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/user/userSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  
  // Extract cartItems from the Redux state to display the dynamic count
  const { cartItems } = useSelector((state) => state.cart);
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success("Logged out successfully");
    setProfileDropdownOpen(false);
    setOpen(false);
    navigate("/login"); 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate with URL encoded keyword parameter
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      // Navigate to default products page if empty
      navigate("/products");
    }
    setSearchQuery("");
  };

  return (
    <nav>
      <div className="sticky top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
            <ShoppingBag />
            <span>Shopping Hub</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">
              Home
            </Link>
            <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/products">
              Products
            </Link>
            <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/about-us">
              About Us
            </Link>
            <Link className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/contact-us">
              Contact Us
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center border border-slate-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search Product"
                className="px-3 py-2 text-sm w-40 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="px-3 text-gray-500 hover:text-blue-600 transition">
                <Search size={18} />
              </button>
            </form>

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition">
              <ShoppingCart />
              {cartItems?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Register / User Dropdown */}
            {!isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition font-semibold">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <User size={18} />
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  className="flex items-center"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <img
                    src={user?.avatar?.url || "/default-avatar.png"}
                    alt={user?.name}
                    title={user?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                  />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      {/* --- ADDED ADMIN LINK FOR DESKTOP DROPDOWN --- */}
                      {user && user.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      {/* --------------------------------------------- */}

                      <Link
                        to="/orders/user"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger Menu Icon */}
            <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
        <div className="flex flex-col p-4 gap-4 bg-white shadow-md">
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/products">
            Products
          </Link>
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/about-us">
            About Us
          </Link>
          <Link onClick={() => setOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-semibold" to="/contact-us">
            Contact Us
          </Link>

          {!isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <Link
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
                to="/login"
              >
                Login
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-blue-600 transition font-semibold"
                to="/register"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar?.url || "/default-avatar.png"}
                  alt={user?.name || "Profile"}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 mt-2">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                {/* --- ADDED ADMIN LINK FOR MOBILE MENU --- */}
                {user && user.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {/* -------------------------------------- */}

                <Link
                  to="/orders/user"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left px-4 text-red-600 hover:text-red-700 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;