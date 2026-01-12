import { Link } from "react-router";
import { useState, useEffect } from "react";
import axiosInstance from "../config/api";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaUniversity,
  FaDollarSign,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axiosInstance.get("/api/scholarships");
        const topSix = data.scholarships.slice(0, 6);
        setScholarships(topSix);
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-base-200 transition-colors duration-300">
        <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Top Scholarships
              </h2>
              <p className="text-base-content opacity-70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                Explore the most popular scholarship opportunities
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="bg-base-300 h-64 rounded-2xl"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-6 bg-base-300 rounded"></div>
                  <div className="h-4 bg-base-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Top Scholarships
          </h2>
          <p className="text-base-content opacity-70 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Explore the most popular scholarship opportunities
          </p>
        </motion.div>

        {scholarships.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-base-content opacity-70 text-xl">
              No scholarships available at the moment.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {scholarships.map((scholarship, index) => (
                <motion.div
                  key={scholarship._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4 z-10 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                      <FaStar className="text-xs" />
                      Featured
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <motion.img
                      src={scholarship.universityImage}
                      alt={scholarship.universityName}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* University Name Overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2 text-white">
                        <FaUniversity className="text-sm" />
                        <p className="font-semibold text-sm truncate">
                          {scholarship.universityName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-base-content mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {scholarship.scholarshipName}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-base-content opacity-70 mb-3">
                      <FaMapMarkerAlt className="text-purple-500 shrink-0" />
                      <span className="truncate">
                        {scholarship.universityCity},{" "}
                        {scholarship.universityCountry}
                      </span>
                    </div>

                    {/* Tags - Fixed for dark mode */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {scholarship.scholarshipCategory}
                      </span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                        {scholarship.degree}
                      </span>
                    </div>

                    {/* Application Fee - Fixed for dark mode */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 rounded-lg">
                      <FaDollarSign className="text-purple-600" />
                      <div>
                        <p className="text-xs text-black opacity-60">
                          Application Fee
                        </p>
                        <p className="text-lg font-bold text-purple-600">
                          ${scholarship.applicationFees}
                        </p>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/scholarships/${scholarship._id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group/btn"
                    >
                      <span>View Details</span>
                      <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
              className="text-center mt-12 lg:mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link
                to="/scholarships"
                className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>View All Scholarships</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopScholarships;
