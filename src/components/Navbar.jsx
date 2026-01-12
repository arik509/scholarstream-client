import { Link, useNavigate, NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Purple & Tea.png";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import ThemeToggle from "../contexts/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333ea",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logoutUser();
          setIsDropdownOpen(false);
          Swal.fire({
            title: "Logged Out!",
            text: "You have been successfully logged out",
            icon: "success",
            confirmButtonColor: "#9333ea",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/");
        } catch (error) {
          console.error("Logout failed:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to logout. Please try again.",
            icon: "error",
            confirmButtonColor: "#9333ea",
          });
        }
      }
    });
  };

  return (
    <div className="sticky top-0 z-50 bg-base-100 backdrop-blur-lg bg-opacity-95 border-b border-base-300 shadow-sm transition-colors duration-300">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-11/12 mx-auto"
      >
        <div className="px-4 lg:px-0">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10">
                <img
                  className="w-full h-full object-contain"
                  src={logo}
                  alt="ScholarStream Logo"
                />
              </div>
              <Link
                to="/"
                className="text-2xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"
              >
                ScholarStream
              </Link>
            </motion.div>

            <div className="hidden lg:flex items-center gap-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-transparent bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text"
                      : "text-base-content hover:text-transparent hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/scholarships"
                className={({ isActive }) =>
                  `font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-transparent bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text"
                      : "text-base-content hover:text-transparent hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text"
                  }`
                }
              >
                All Scholarships
              </NavLink>
              {user && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `font-semibold transition-all duration-200 relative ${
                      isActive
                        ? "text-transparent bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-linear-to-r after:from-purple-600 after:to-pink-600"
                        : "text-base-content hover:text-transparent hover:bg-linear-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-purple-600 after:to-pink-600 hover:after:w-full after:transition-all after:duration-300"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </div>

            {/* Desktop User Section */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />

              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full ring-2 ring-purple-500"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600 dark:text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </motion.svg>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsDropdownOpen(false)}
                        ></div>
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
                        >
                          <div className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 p-4 text-white">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={
                                    user.photoURL ||
                                    "https://via.placeholder.com/150"
                                  }
                                  alt={user.displayName || "User"}
                                  className="w-12 h-12 rounded-full border-2 border-white/30"
                                />
                              </div>
                              <div>
                                <p className="font-bold text-lg">
                                  {user.displayName || "User"}
                                </p>
                                <p className="text-xs opacity-90 truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <Link
                              to="/dashboard"
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-all group"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <FaUser className="text-purple-500 group-hover:scale-110 transition-transform" />
                              Dashboard
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-semibold transition-all group"
                            >
                              <FiLogOut className="group-hover:scale-110 transition-transform" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-xl font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-xl font-semibold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-colors"
            >
              {isOpen ? (
                <FiX className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden pb-4 space-y-2 overflow-hidden"
              >
                {/* Theme Toggle for Mobile */}
                <div className="flex justify-between items-center py-3 px-4">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>

                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-xl transition-all font-semibold ${
                      isActive
                        ? "bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                        : "text-base-content hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/scholarships"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-xl transition-all font-semibold ${
                      isActive
                        ? "bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                        : "text-base-content hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  All Scholarships
                </NavLink>

                {user ? (
                  <>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `block py-3 px-4 rounded-xl transition-all font-semibold ${
                          isActive
                            ? "bg-linear-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400"
                            : "text-base-content hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <div className="px-4 py-4 bg-linear-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={
                              user.photoURL || "https://via.placeholder.com/150"
                            }
                            alt={user.displayName || "User"}
                            className="w-12 h-12 rounded-full ring-2 ring-purple-500"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200">
                            {user.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-all font-semibold"
                    >
                      <FiLogOut />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3 px-4 pt-2">
                    <Link
                      to="/login"
                      className="flex-1 py-2.5 text-center rounded-xl font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 hover:text-white transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex-1 py-2.5 text-center rounded-xl font-semibold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
