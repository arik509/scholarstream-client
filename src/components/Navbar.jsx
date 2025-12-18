import { Link } from "react-router";
import { useState } from "react";
import logo from "../assets/Purple & Tea.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white w-11/12 mx-auto shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-opacity-95 border-b border-gray-100">
        <div className="px-4 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <img
                  className="w-full h-full object-contain"
                  src={logo}
                  alt="ScholarStream Logo"
                />
              </div>
              <Link
                to="/"
                className="text-2xl font-bold bg-linear-to-r from-[#7c3aed] to-[#14b8a6] bg-clip-text text-transparent "
              >
                ScholarStream
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="font-semibold text-gray-700 hover:text-[#7c3aed] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#7c3aed] hover:after:w-full after:transition-all after:duration-300"
              >
                Home
              </Link>
              <Link
                to="/scholarships"
                className="font-semibold text-gray-700 hover:text-[#7c3aed] transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#7c3aed] hover:after:w-full after:transition-all after:duration-300"
              >
                All Scholarships
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-lg font-semibold text-[#7c3aed] border-2 border-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition-all duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-lg font-semibold bg-linear-to-r from-[#7c3aed] to-[#14b8a6] text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:from-[#6d28d9] hover:to-[#0f9e8a]"
              >
                Register
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden pb-4 space-y-2">
              <Link
                to="/"
                className="block py-3 px-4 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-[#7c3aed] transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/scholarships"
                className="block py-3 px-4 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-[#7c3aed] transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                All Scholarships
              </Link>
              <div className="flex gap-3 px-4 pt-2">
                <Link
                  to="/login"
                  className="flex-1 py-2.5 text-center rounded-lg font-semibold text-[#7c3aed] border-2 border-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 py-2.5 text-center rounded-lg font-semibold bg-linear-to-r from-[#7c3aed] to-[#14b8a6] text-white shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
