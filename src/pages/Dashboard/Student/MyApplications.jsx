import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";
import axiosInstance from "../../../config/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaEye,
  FaCreditCard,
  FaEdit,
  FaTrash,
  FaStar,
  FaTimes,
  FaPaperPlane,
  FaFileAlt,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const MyApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    ratingPoint: 5,
    reviewComment: "",
  });

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/applications/user/${user.email}`
      );
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load your applications",
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
      html: `You are about to delete your application to <strong>${universityName}</strong>. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/applications/${id}`);
        setApplications(applications.filter((app) => app._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your application has been deleted successfully",
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting application:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete application. Please try again.",
          icon: "error",
          confirmButtonColor: "#8b5cf6",
        });
      }
    }
  };

  const handlePay = (app) => {
    navigate(`/checkout/${app.scholarshipId}`, {
      state: { applicationId: app._id },
    });
  };

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    document.getElementById("details_modal").showModal();
  };

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setReviewData({ ratingPoint: 5, reviewComment: "" });
    document.getElementById("review_modal").showModal();
  };

  const handleSubmitReview = async () => {
    if (!reviewData.reviewComment.trim()) {
      Swal.fire({
        title: "Missing Review!",
        text: "Please write a review comment before submitting",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    try {
      const review = {
        scholarshipId: selectedApp.scholarshipId,
        universityName: selectedApp.universityName,
        userName: user.displayName,
        userEmail: user.email,
        userImage: user.photoURL,
        ratingPoint: reviewData.ratingPoint,
        reviewComment: reviewData.reviewComment,
        reviewDate: new Date(),
      };

      await axiosInstance.post("/api/reviews", review);
      document.getElementById("review_modal").close();

      Swal.fire({
        title: "Thank You!",
        text: "Your review has been submitted successfully",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        timer: 2000,
        showConfirmButton: false,
      });

      setReviewData({ ratingPoint: 5, reviewComment: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit review. Please try again.",
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
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-linear-to-r from-green-500 to-emerald-500";
      case "processing":
        return "bg-linear-to-r from-yellow-500 to-orange-500";
      case "rejected":
        return "bg-linear-to-r from-red-500 to-pink-500";
      default:
        return "bg-linear-to-r from-blue-500 to-cyan-500";
    }
  };

  const getPaymentColor = (status) => {
    return status === "paid"
      ? "bg-linear-to-r from-green-500 to-emerald-500"
      : "bg-linear-to-r from-red-500 to-pink-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Applications
          </h1>
          {applications.length > 0 && (
            <span className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
              {applications.length}
            </span>
          )}
        </div>
      </div>

      {applications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 shadow-xl rounded-2xl border border-base-300 transition-colors duration-300"
        >
          <div className="p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center transition-colors duration-300">
              <FaFileAlt className="text-5xl text-purple-600" />
            </div>
            <p className="text-base-content opacity-70 text-lg mb-6">
              You haven't applied to any scholarships yet.
            </p>
            <button
              onClick={() => navigate("/scholarships")}
              className="px-8 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Browse Scholarships
            </button>
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
                    <th className="text-base-content">Category</th>
                    <th className="text-base-content">Fees</th>
                    <th className="text-base-content">Status</th>
                    <th className="text-base-content">Payment</th>
                    <th className="text-base-content">Feedback</th>
                    <th className="text-base-content">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr
                      key={app._id}
                      className="border-b border-base-300 hover:bg-base-200 transition-colors duration-200"
                    >
                      <th className="text-base-content">{index + 1}</th>
                      <td>
                        <div className="font-bold text-base-content">
                          {app.universityName}
                        </div>
                        <div className="text-sm text-base-content opacity-60">
                          {app.degree}
                        </div>
                      </td>
                      <td>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          {app.scholarshipCategory}
                        </span>
                      </td>
                      <td className="font-semibold text-base-content">
                        ${app.applicationFees}
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 ${getStatusColor(
                            app.applicationStatus
                          )} text-white rounded-full text-xs font-semibold shadow-md`}
                        >
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 ${getPaymentColor(
                            app.paymentStatus
                          )} text-white rounded-full text-xs font-semibold shadow-md`}
                        >
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="max-w-xs truncate text-base-content opacity-70">
                          {app.feedback || "No feedback yet"}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => openDetailsModal(app)}
                            className="px-3 py-1.5 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center justify-center gap-1 transition-all"
                          >
                            <FaEye />
                            Details
                          </button>

                          {app.applicationStatus === "pending" &&
                            app.paymentStatus === "unpaid" && (
                              <button
                                onClick={() => handlePay(app)}
                                className="px-3 py-1.5 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white text-xs flex items-center justify-center gap-1 transition-all"
                              >
                                <FaCreditCard />
                                Pay
                              </button>
                            )}

                          {app.applicationStatus === "pending" && (
                            <>
                              <button className="px-3 py-1.5 rounded-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white text-xs flex items-center justify-center gap-1 transition-all">
                                <FaEdit />
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(app._id, app.universityName)
                                }
                                className="px-3 py-1.5 rounded-lg font-semibold bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center gap-1 transition-all"
                              >
                                <FaTrash />
                                Delete
                              </button>
                            </>
                          )}

                          {app.applicationStatus === "completed" && (
                            <button
                              onClick={() => openReviewModal(app)}
                              className="px-3 py-1.5 rounded-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs flex items-center justify-center gap-1 transition-all"
                            >
                              <MdRateReview />
                              Review
                            </button>
                          )}
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

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-2xl bg-base-100 border border-base-300 transition-colors duration-300">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-base-content">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <FaEye className="text-white" />
            </div>
            Application Details
          </h3>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    University Name
                  </p>
                  <p className="font-semibold text-base-content">
                    {selectedApp.universityName}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Scholarship Category
                  </p>
                  <p className="font-semibold text-base-content">
                    {selectedApp.scholarshipCategory}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Degree
                  </p>
                  <p className="font-semibold text-base-content">
                    {selectedApp.degree}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Application Fees
                  </p>
                  <p className="font-semibold text-base-content">
                    ${selectedApp.applicationFees}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Service Charge
                  </p>
                  <p className="font-semibold text-base-content">
                    ${selectedApp.serviceCharge}
                  </p>
                </div>
                <div className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Total Paid
                  </p>
                  <p className="font-bold text-lg bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ${selectedApp.applicationFees + selectedApp.serviceCharge}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Application Status
                  </p>
                  <p className="font-semibold text-base-content capitalize">
                    {selectedApp.applicationStatus}
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Payment Status
                  </p>
                  <p className="font-semibold text-base-content capitalize">
                    {selectedApp.paymentStatus}
                  </p>
                </div>
                <div className="col-span-2 bg-base-200 p-4 rounded-xl transition-colors duration-300">
                  <p className="text-sm text-base-content opacity-60 mb-1">
                    Application Date
                  </p>
                  <p className="font-semibold text-base-content">
                    {new Date(selectedApp.applicationDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
                {selectedApp.feedback && (
                  <div className="col-span-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                    <p className="text-sm text-base-content opacity-60 mb-2">
                      Moderator Feedback
                    </p>
                    <p className="font-semibold text-base-content">
                      {selectedApp.feedback}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="px-6 py-2.5 rounded-xl font-semibold text-base-content hover:bg-base-200 transition-all flex items-center gap-2">
                <FaTimes />
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box bg-base-100 border border-base-300 transition-colors duration-300">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-base-content">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <MdRateReview className="text-white" />
            </div>
            Add Review
          </h3>
          {selectedApp && (
            <div className="space-y-4">
              <div className="bg-base-200 p-4 rounded-xl transition-colors duration-300">
                <p className="font-semibold text-base-content">
                  {selectedApp.universityName}
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
                        setReviewData({ ...reviewData, ratingPoint: star })
                      }
                      className="text-3xl transition-transform hover:scale-125"
                    >
                      {star <= reviewData.ratingPoint ? "⭐" : "☆"}
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-base-content">
                    {reviewData.ratingPoint}/5
                  </span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">
                    Review Comment
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  placeholder="Share your experience with this scholarship..."
                  value={reviewData.reviewComment}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      reviewComment: e.target.value,
                    })
                  }
                ></textarea>
              </div>
            </div>
          )}
          <div className="modal-action">
            <button
              onClick={handleSubmitReview}
              className="px-6 py-2.5 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <FaPaperPlane />
              Submit Review
            </button>
            <form method="dialog">
              <button className="px-6 py-2.5 rounded-xl font-semibold text-base-content hover:bg-base-200 transition-all flex items-center gap-2">
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

export default MyApplications;
