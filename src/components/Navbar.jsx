import { Link, useNavigate } from "react-router";
import { useState } from "react";
import logo from "../assets/Purple & Tea.png";
import { useAuth } from "../contexts/AuthContext";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser();
          setIsDropdownOpen(false);
          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been successfully logged out',
            icon: 'success',
            confirmButtonColor: '#8b5cf6',
            timer: 2000,
            showConfirmButton: false
          });
          navigate('/');
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to logout. Please try again.',
            icon: 'error',
            confirmButtonColor: '#8b5cf6'
          });
        }
      }
    });
  };

  return (
    <div>
      <nav className="bg-white w-11/12 mx-auto sticky top-0 z-50 backdrop-blur-lg bg-opacity-95 border-b border-gray-100">
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
              <Link to="/" className="text-3xl font-bold text-primary">
                Scholar Stream
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="font-semibold text-gray-700 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                Home
              </Link>
              <Link
                to="/scholarships"
                className="font-semibold text-gray-700 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                All Scholarships
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="font-semibold text-gray-700 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  Dashboard
                </Link>
              )}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200"
                  >
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt={user.displayName || "User"}
                      className="w-10 h-10 rounded-full ring-2 ring-primary"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                        <div className="bg-linear-to-r from-primary to-accent p-4 text-white">
                          <p className="font-bold text-lg">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-sm opacity-90">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/dashboard"
                            className="block px-4 py-3 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-primary font-semibold transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                             Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-error font-semibold transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-lg font-semibold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-lg font-semibold bg-linear-to-r from-primary to-secondary text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Register
                  </Link>
                </>
              )}
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
                className="block py-3 px-4 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-primary transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/scholarships"
                className="block py-3 px-4 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-primary transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                All Scholarships
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block py-3 px-4 rounded-lg hover:bg-purple-50 text-gray-700 hover:text-primary transition-colors font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-3 bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt={user.displayName || "User"}
                        className="w-12 h-12 rounded-full ring-2 ring-primary"
                      />
                      <div>
                        <p className="font-bold text-gray-800">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 rounded-lg hover:bg-red-50 text-error transition-colors font-semibold"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3 px-4 pt-2">
                  <Link
                    to="/login"
                    className="flex-1 py-2.5 text-center rounded-lg font-semibold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 py-2.5 text-center rounded-lg font-semibold bg-linear-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
