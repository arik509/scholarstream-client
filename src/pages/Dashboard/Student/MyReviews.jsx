import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axiosInstance from "../../../config/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { MdEdit, MdDeleteForever, MdRateReview } from "react-icons/md";
import { FaStar, FaRegStar, FaPaperPlane, FaTimes } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editData, setEditData] = useState({
    ratingPoint: 5,
    reviewComment: "",
  });

  useEffect(() => {
    if (user?.email) {
      fetchReviews();
    }
  }, [user]);

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/reviews/user/${user.email}`
      );
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load your reviews",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, universityName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `You are about to delete your review for <strong>${universityName}</strong>. This action cannot be undone!`,
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
          text: "Your review has been deleted successfully",
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

  const openEditModal = (review) => {
    setEditingReview(review);
    setEditData({
      ratingPoint: review.ratingPoint,
      reviewComment: review.reviewComment,
    });
    document.getElementById("edit_modal").showModal();
  };

  const handleUpdateReview = async () => {
    if (!editData.reviewComment.trim()) {
      Swal.fire({
        title: "Missing Comment!",
        text: "Please write a review comment before updating",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    try {
      await axiosInstance.patch(`/api/reviews/${editingReview._id}`, editData);
      setReviews(
        reviews.map((r) =>
          r._id === editingReview._id ? { ...r, ...editData } : r
        )
      );
      document.getElementById("edit_modal").close();

      Swal.fire({
        title: "Updated!",
        text: "Your review has been updated successfully",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating review:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update review. Please try again.",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    }
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
            My Reviews
          </h1>
          {reviews.length > 0 && (
            <span className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
              {reviews.length}
            </span>
          )}
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
            <p className="text-base-content opacity-70 text-lg mb-2">
              You haven't written any reviews yet.
            </p>
            <p className="text-base-content opacity-50 text-sm">
              Complete your applications to leave reviews!
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="bg-base-100 shadow-xl rounded-2xl border border-base-300 overflow-hidden transition-colors duration-300">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="border-b border-base-300">
                    <th className="text-base-content">#</th>
                    <th className="text-base-content">University</th>
                    <th className="text-base-content">Rating</th>
                    <th className="text-base-content">Comment</th>
                    <th className="text-base-content">Date</th>
                    <th className="text-base-content">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr
                      key={review._id}
                      className="border-b border-base-300 hover:bg-base-200 transition-colors duration-200"
                    >
                      <th className="text-base-content">{index + 1}</th>
                      <td className="font-semibold text-base-content">
                        {review.universityName}
                      </td>
                      <td>
                        <div className="flex gap-1 items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < review.ratingPoint ? (
                                <FaStar className="inline text-yellow-500 text-sm" />
                              ) : (
                                <FaRegStar className="inline text-gray-400 dark:text-gray-600 text-sm" />
                              )}
                            </span>
                          ))}
                          <span className="ml-2 text-sm text-base-content opacity-70 font-semibold">
                            {review.ratingPoint}/5
                          </span>
                        </div>
                      </td>
                      <td className="max-w-xs">
                        <p className="truncate italic text-base-content opacity-80">
                          "{review.reviewComment}"
                        </p>
                      </td>
                      <td className="text-sm text-base-content opacity-70">
                        {new Date(review.reviewDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(review)}
                            className="px-3 py-1.5 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white text-xs flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <MdEdit />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(review._id, review.universityName)
                            }
                            className="px-3 py-1.5 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white text-xs flex items-center gap-1 transition-all cursor-pointer"
                          >
                            <MdDeleteForever />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-base-100 border border-base-300 transition-colors duration-300">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-base-content">
            <div className="w-10 h-10 bg-linear-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <MdEdit className="text-white cursor-pointer" />
            </div>
            Edit Review
          </h3>
          {editingReview && (
            <div className="space-y-4">
              <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 transition-colors duration-300">
                <p className="font-semibold text-base-content">
                  {editingReview.universityName}
                </p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    Rating
                  </span>
                </label>
                <div className="flex gap-2 items-center bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setEditData({ ...editData, ratingPoint: star })
                      }
                      className="text-3xl transition-transform hover:scale-125 cursor-pointer"
                    >
                      {star <= editData.ratingPoint ? "⭐" : "☆"}
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-base-content">
                    {editData.ratingPoint}/5
                  </span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content cursor-pointer">
                    Review Comment
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Update your review..."
                  value={editData.reviewComment}
                  onChange={(e) =>
                    setEditData({ ...editData, reviewComment: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          )}
          <div className="modal-action">
            <button
              onClick={handleUpdateReview}
              className="px-6 py-2.5 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <FaPaperPlane />
              Update Review
            </button>
            <form method="dialog">
              <button className="px-6 py-2.5 rounded-xl font-semibold text-base-content hover:bg-base-200 transition-all flex items-center gap-2 cursor-pointer">
                <FaTimes />
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyReviews;
