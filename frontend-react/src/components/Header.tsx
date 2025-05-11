import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { getCSRFToken } from "../utils/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout/",
        {},
        {
          withCredentials: true,
          headers: {
            "X-CSRFToken": getCSRFToken(),
          },
        }
      );
      // Clear any stored user data
      localStorage.removeItem("user");
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#FF0000]">
              TOSHIBA
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-[#FF0000]">
              Products
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-[#FF0000]">
              Services
            </Link>
            <Link to="/news" className="text-gray-700 hover:text-[#FF0000]">
              News
            </Link>
            <Link to="/careers" className="text-gray-700 hover:text-[#FF0000]">
              Careers
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-[#FF0000]"
            >
              Logout
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#FF0000]"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-700 hover:text-[#FF0000]"
              >
                Products
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-gray-700 hover:text-[#FF0000]"
              >
                Services
              </Link>
              <Link
                to="/news"
                className="block px-3 py-2 text-gray-700 hover:text-[#FF0000]"
              >
                News
              </Link>
              <Link
                to="/careers"
                className="block px-3 py-2 text-gray-700 hover:text-[#FF0000]"
              >
                Careers
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#FF0000]"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
