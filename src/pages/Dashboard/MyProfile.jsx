import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-linear-to-r from-red-500 to-pink-500";
      case "Moderator":
        return "bg-linear-to-r from-yellow-500 to-orange-500";
      default:
        return "bg-linear-to-r from-blue-500 to-cyan-500";
    }
  };

  const getRoleIcon = (role) => {
    return role === "Admin" || role === "Moderator" ? FaShieldAlt : FaUser;
  };

  const RoleIcon = getRoleIcon(user?.role);

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          My Profile
        </h1>
        <p className="text-base-content opacity-70">
          View and manage your account information
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden max-w-3xl border border-base-300 transition-colors duration-300"
      >
        <div className="p-6 lg:p-8">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="relative shrink-0"
            >
              <div className="avatar">
                <div className="w-32 h-32 rounded-full ring-4 ring-purple-500 ring-offset-4 ring-offset-base-100 shadow-2xl transition-colors duration-300">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt={user?.displayName}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-base-100 rounded-full flex items-center justify-center transition-colors duration-300">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </motion.div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-base-content mb-2">
                {user?.displayName}
              </h2>
              <p className="text-base-content opacity-70 mb-4 flex items-center justify-center sm:justify-start gap-2">
                <FaEnvelope className="text-purple-600" />
                {user?.email}
              </p>
              <span
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg ${getRoleBadgeColor(
                  user?.role
                )}`}
              >
                <RoleIcon />
                {user?.role || "Student"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-base-300 to-transparent mb-8"></div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <FaUser className="text-white" />
                </div>
                <p className="text-sm font-medium text-base-content opacity-60">
                  Full Name
                </p>
              </div>
              <p className="font-bold text-lg text-base-content pl-13">
                {user?.displayName}
              </p>
            </motion.div>

            {/* Email Address */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <FaEnvelope className="text-white" />
                </div>
                <p className="text-sm font-medium text-base-content opacity-60">
                  Email Address
                </p>
              </div>
              <p className="font-bold text-lg text-base-content pl-13 break-all">
                {user?.email}
              </p>
            </motion.div>

            {/* Account Role */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <RoleIcon className="text-white" />
                </div>
                <p className="text-sm font-medium text-base-content opacity-60">
                  Account Role
                </p>
              </div>
              <p className="font-bold text-lg text-base-content pl-13">
                {user?.role || "Student"}
              </p>
            </motion.div>

            {/* Account Status */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-yellow-100 dark:border-yellow-800 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                  <FaCheckCircle className="text-white" />
                </div>
                <p className="text-sm font-medium text-base-content opacity-60">
                  Account Status
                </p>
              </div>
              <div className="flex items-center gap-2 pl-13">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="font-bold text-lg text-base-content">Active</p>
              </div>
            </motion.div>
          </div>

          {/* Additional Info Section */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className="mt-8 bg-linear-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800 transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                <FaCheckCircle className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base-content mb-2">
                  Profile Complete
                </h3>
                <p className="text-sm text-base-content opacity-70">
                  Your profile is set up and ready to use. You can now access
                  all features available for your account type.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MyProfile;
