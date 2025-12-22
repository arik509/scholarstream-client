import { Outlet, NavLink, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaUser, FaFileAlt, FaStar, FaClipboardList, FaComments, FaPlus, FaBook, FaUsers, FaChartBar, FaHome } from 'react-icons/fa';
import logo from "../assets/Purple & Tea.png"

const DashboardLayout = () => {
  const { user } = useAuth();

  const studentLinks = [
    { path: '/dashboard', label: 'My Profile', icon: FaUser, end: true },
    { path: '/dashboard/my-applications', label: 'My Applications', icon: FaFileAlt },
    { path: '/dashboard/my-reviews', label: 'My Reviews', icon: FaStar }
  ];

  const moderatorLinks = [
    { path: '/dashboard', label: 'My Profile', icon: FaUser, end: true },
    { path: '/dashboard/manage-applications', label: 'Manage Applications', icon: FaClipboardList },
    { path: '/dashboard/all-reviews', label: 'All Reviews', icon: FaComments }
  ];

  const adminLinks = [
    { path: '/dashboard', label: 'My Profile', icon: FaUser, end: true },
    { path: '/dashboard/add-scholarship', label: 'Add Scholarship', icon: FaPlus },
    { path: '/dashboard/manage-scholarships', label: 'Manage Scholarships', icon: FaBook },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: FaUsers },
    { path: '/dashboard/analytics', label: 'Analytics', icon: FaChartBar }
  ];

  let links = studentLinks;
  if (user?.role === 'Moderator') {
    links = moderatorLinks;
  } else if (user?.role === 'Admin') {
    links = adminLinks;
  }

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col bg-linear-to-b from-gray-50 to-white">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="navbar bg-white lg:hidden shadow-lg border-b-2 border-gray-100"
        >
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current text-purple-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </div>
        </motion.div>
        
        <div className="p-4 lg:p-8 min-h-screen">
          <Outlet />
        </div>
      </div>
      
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="menu p-6 w-80 min-h-full bg-white shadow-2xl border-r-2 border-gray-100"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 px-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10">
                <img src={logo} alt="" />
              </div>
              <Link to="/" className="text-2xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mt-2">
                ScholarStream
              </Link>
            </div>
            <div className="px-4 py-2 bg-linear-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl border border-purple-100">
              <p className="text-sm font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {user?.role || 'Student'} Dashboard
              </p>
            </div>
          </motion.div>
          
          <motion.ul
            variants={sidebarVariants}
            className="space-y-2"
          >
            {links.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.li
                  key={link.path}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <NavLink
                    to={link.path}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isActive 
                          ? 'bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg scale-105' 
                          : 'text-gray-700 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600'
                      }`
                    }
                  >
                    <IconComponent className="text-xl" />
                    <span>{link.label}</span>
                  </NavLink>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="my-6 px-4">
            <div className="h-px bg-linear-to-r from-transparent via-purple-300 to-transparent"></div>
          </div>

          <motion.ul variants={sidebarVariants}>
            <motion.li
              variants={itemVariants}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300"
              >
                <FaHome className="text-xl" />
                <span>Back to Home</span>
              </Link>
            </motion.li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-auto pt-6"
          >
            <div className="p-4 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt={user?.displayName || "User"}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-sm truncate">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs opacity-90 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="text-[11px] opacity-75 text-center">
                Logged in as {user?.role || 'Student'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
