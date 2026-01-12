import { useState, useEffect } from "react";
import axiosInstance from "../../../config/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaTrash, FaStar, FaRegStar, FaCalendarAlt } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get("/api/reviews");
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load reviews",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to delete <strong>${userName}'s</strong> review. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/reviews/${id}`);
        setReviews(reviews.filter((r) => r._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Review has been deleted successfully",
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete review. Please try again.",
          icon: "error",
          confirmButtonColor: "#8b5cf6",
        });
      }
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-base-content opacity-70 font-semibold">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center transition-colors duration-300">
            <MdRateReview className="text-2xl text-purple-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            All Reviews
          </h1>
          <span className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
            {reviews.length}
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 shadow-xl rounded-2xl border border-base-300 transition-colors duration-300"
        >
          <div className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center transition-colors duration-300">
              <MdRateReview className="text-5xl text-purple-600" />
            </div>
            <p className="text-base-content opacity-70 text-lg">
              No reviews available yet.
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-base-100 shadow-lg hover:shadow-2xl rounded-2xl border border-base-300 overflow-hidden transition-all duration-300"
            >
              <div className="p-6">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-base-100 transition-colors duration-300">
                      <img
                        src={
                          review.userImage || "https://via.placeholder.com/150"
                        }
                        alt={review.userName}
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-base-content truncate">
                      {review.userName}
                    </h3>
                    <p className="text-sm text-base-content opacity-60 truncate">
                      {review.userEmail}
                    </p>
                  </div>
                </div>

                {/* University and Rating */}
                <div className="mb-4">
                  <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 rounded-xl mb-3 border border-purple-100 dark:border-purple-800 transition-colors duration-300">
                    <p className="font-semibold text-base-content truncate">
                      {review.universityName}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.ratingPoint ? (
                            <FaStar className="inline text-yellow-500 text-lg" />
                          ) : (
                            <FaRegStar className="inline text-gray-400 dark:text-gray-600 text-lg" />
                          )}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-base-content opacity-70 font-bold">
                      {review.ratingPoint}/5
                    </span>
                  </div>
                </div>

                {/* Review Comment */}
                <div className="bg-base-200 p-4 rounded-xl mb-4 transition-colors duration-300">
                  <p className="text-base-content opacity-80 italic line-clamp-3">
                    "{review.reviewComment}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-base-300">
                  <div className="flex items-center gap-2 text-sm text-base-content opacity-60">
                    <FaCalendarAlt className="text-purple-500" />
                    {new Date(review.reviewDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <button
                    onClick={() => handleDelete(review._id, review.userName)}
                    className="px-3 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white text-sm flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AllReviews;
