import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = false;
  
  // Added search query state as shown in the video
  const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

  // Added handleSearch function structure as shown in the video
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
            
            {/* Form updated with onSubmit, value, onChange, and type="submit" */}
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
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold min-w-5 h-5 rounded-full flex items-center justify-center">
                6
              </span>
            </Link>

            {/* Register */}
            {!isAuthenticated && (
              <Link to="/register" className="hidden sm:flex gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <User size={18} />
                Register
              </Link>
            )}

            {/* Hamburger Menu Icon */}
            <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}>
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
          {!isAuthenticated && (
             <Link onClick={() => setOpen(false)} to="/register" className="flex gap-2 items-center text-gray-700 hover:text-blue-600 transition font-semibold">
               <User size={18} />
               Register
             </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;