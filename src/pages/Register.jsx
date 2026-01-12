import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaEnvelope, FaImage, FaLock, FaExclamationCircle, FaUserPlus } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password, name, photoURL);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login with Google.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 register-bg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full"
      >
        <motion.div
          variants={itemVariants}
          className="bg-base-100 rounded-2xl shadow-2xl p-8 border border-base-300"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center register-icon-bg"
            >
              <FaUserPlus className="text-4xl text-purple-600" />
            </motion.div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h2>
            <p className="text-base-content opacity-70">
              Join ScholarStream today
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl flex items-center gap-3 error-alert"
            >
              <FaExclamationCircle className="text-red-500 text-xl flex-shrink-0" />
              <span className="text-sm font-semibold error-text">
                {error}
              </span>
            </motion.div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name Field */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <FaUser className="text-purple-500" />
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-base-200 border-base-300 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <FaEnvelope className="text-purple-500" />
                  Email Address
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-base-200 border-base-300 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            {/* Photo URL Field */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <FaImage className="text-purple-500" />
                  Photo URL
                </span>
              </label>
              <input
                type="url"
                placeholder="Enter photo URL (optional)"
                className="input input-bordered w-full bg-base-200 border-base-300 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <FaLock className="text-purple-500" />
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-200 border-base-300 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <span className="label-text-alt text-base-content opacity-60">
                  Min 6 characters, 1 uppercase, 1 special character
                </span>
              </label>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={itemVariants} className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base-content flex items-center gap-2">
                  <FaLock className="text-purple-500" />
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="input input-bordered w-full bg-base-200 border-base-300 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </motion.div>

            {/* Register Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                'Register'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="divider my-6 text-base-content opacity-60">OR</div>

          {/* Google Login Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-xl font-semibold border-2 border-base-300 bg-base-100 hover:bg-base-200 text-base-content transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </motion.button>

          {/* Login Link */}
          <motion.p
            variants={itemVariants}
            className="text-center text-base-content opacity-70 mt-6"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </motion.p>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <Link
            to="/"
            className="text-base-content opacity-70 hover:opacity-100 hover:text-purple-600 font-semibold transition-all inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
