import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";
import { MdSchool } from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 notfound-bg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full text-center"
      >
        {/* 404 Number with Icon */}
        <div className="relative mb-8">
          {/* Animated background blob */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 notfound-blob rounded-full blur-3xl"
          />

          {/* 404 Text */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <h1 className="text-[140px] md:text-[220px] font-black text-transparent bg-clip-text bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 leading-none">
              404
            </h1>

            {/* Rotating Icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <MdSchool className="text-6xl md:text-8xl notfound-icon opacity-20" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-base-content">
            Oops! Page Not Found
          </h2>

          <p className="text-lg md:text-xl text-base-content opacity-70 max-w-2xl mx-auto">
            The scholarship you're looking for seems to have gone on a study
            break. Don't worry, we'll help you find your way back!
          </p>

          {/* Action Buttons */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-purple-600 text-purple-600 hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center cursor-pointer"
            >
              <FaArrowLeft />
              Go Back
            </motion.button>

            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center cursor-pointer"
              >
                <FaHome />
                Home Page
              </motion.button>
            </Link>

            <Link to="/scholarships">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-teal-500 to-cyan-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 min-w-[180px] justify-center cursor-pointer"
              >
                <FaSearch />
                Browse Scholarships
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Quick Links Cards */}
        <motion.div
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
            <Link
              to="/"
              className="block bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 p-6"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center notfound-card-icon-1">
                  <FaHome className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-base-content">Home</h3>
                <p className="text-sm text-base-content opacity-60">
                  Return to homepage
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
            <Link
              to="/scholarships"
              className="block bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 p-6"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-linear-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center notfound-card-icon-2">
                  <MdSchool className="text-3xl text-teal-600" />
                </div>
                <h3 className="text-lg font-bold text-base-content">
                  Scholarships
                </h3>
                <p className="text-sm text-base-content opacity-60">
                  Explore opportunities
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
            <Link
              to="/dashboard"
              className="block bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 p-6"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 bg-linear-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center notfound-card-icon-3">
                  <FaSearch className="text-3xl text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-base-content">
                  Dashboard
                </h3>
                <p className="text-sm text-base-content opacity-60">
                  Check your applications
                </p>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-sm text-base-content opacity-50"
        >
          <p>
            Lost? Try searching for scholarships or contact our support team.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
