import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../config/api";
import {
  FaMapMarkerAlt,
  FaUniversity,
  FaDollarSign,
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  useEffect(() => {
    fetchScholarships();
  }, [search, country, category, sort, currentPage]);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 9,
        ...(search && { search }),
        ...(country && { country }),
        ...(category && { category }),
        ...(sort && { sort }),
      });

      const { data } = await axiosInstance.get(`/api/scholarships?${params}`);
      setScholarships(data.scholarships);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchInput("");
    setSearch("");
    setCountry("");
    setCategory("");
    setSort("");
    setCurrentPage(1);
  };

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

  if (loading && scholarships.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-base-content opacity-70 font-semibold">
            Loading scholarships...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 lg:py-20 px-4 bg-base-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            All Scholarships
          </h1>
          <p className="text-base-content opacity-70 text-lg sm:text-xl">
            Found{" "}
            <span className="font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {total}
            </span>{" "}
            scholarship opportunities
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 rounded-2xl shadow-xl border border-base-300 mb-12 overflow-hidden transition-colors duration-300"
        >
          <div className="bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 p-4">
            <div className="flex items-center gap-2 text-white">
              <FaFilter className="text-xl" />
              <h2 className="text-xl font-bold">Filter & Search</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-base-content mb-2">
                  <FaSearch className="inline mr-2 text-purple-500" />
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Name, University, Degree..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-base-300 bg-base-100 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              {/* Country Filter */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  Country
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-base-300 bg-base-100 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Countries</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-base-300 bg-base-100 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="Full fund">Full Fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-semibold text-base-content mb-2">
                  <FaSortAmountDown className="inline mr-2 text-purple-500" />
                  Sort By
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-base-300 bg-base-100 text-base-content focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">Default</option>
                  <option value="fees-asc">Fees: Low to High</option>
                  <option value="fees-desc">Fees: High to Low</option>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              <p className="text-base-content opacity-70 font-semibold">
                Loading scholarships...
              </p>
            </div>
          </div>
        ) : scholarships.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-2xl shadow-xl border border-base-300 transition-colors duration-300"
          >
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                <FaSearch className="text-4xl text-purple-600" />
              </div>
              <p className="text-base-content opacity-70 text-xl mb-6">
                No scholarships found
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Scholarship Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {scholarships.map((scholarship) => (
                <motion.div
                  key={scholarship._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
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

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {scholarship.scholarshipCategory}
                      </span>
                      <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                        {scholarship.degree}
                      </span>
                    </div>

                    {/* Application Fee */}
                    <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg transition-colors duration-300">
                      <FaDollarSign className="text-purple-600" />
                      <div>
                        <p className="text-xs text-base-content opacity-60">
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

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mt-12"
              >
                <div className="flex items-center gap-2 bg-base-100 rounded-2xl shadow-lg p-2 border border-base-300 transition-colors duration-300">
                  <button
                    className="px-4 py-2 rounded-xl font-semibold text-base-content hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                          currentPage === index + 1
                            ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-110"
                            : "text-base-content hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600"
                        }`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="px-4 py-2 rounded-xl font-semibold text-base-content hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
