import { useState, useEffect } from "react";
import axiosInstance from "../../../config/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaCommentDots,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get("/api/applications");
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load applications",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus, userName) => {
    const statusIcons = {
      pending: "question",
      processing: "info",
      completed: "success",
      rejected: "warning",
    };

    const result = await Swal.fire({
      title: "Change Application Status?",
      html: `Change <strong>${userName}</strong>'s application status to <strong>${newStatus}</strong>?`,
      icon: statusIcons[newStatus],
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, change it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/api/applications/${id}/status`, {
          applicationStatus: newStatus,
        });
        setApplications(
          applications.map((app) =>
            app._id === id ? { ...app, applicationStatus: newStatus } : app
          )
        );

        Swal.fire({
          title: "Updated!",
          text: `Application status changed to ${newStatus}`,
          icon: "success",
          confirmButtonColor: "#8b5cf6",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error updating status:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update status. Please try again.",
          icon: "error",
          confirmButtonColor: "#8b5cf6",
        });
      }
    } else {
      fetchApplications();
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedApp || !feedback.trim()) {
      Swal.fire({
        title: "Missing Feedback!",
        text: "Please write feedback before submitting",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    try {
      await axiosInstance.patch(
        `/api/applications/${selectedApp._id}/feedback`,
        {
          feedback,
        }
      );
      setApplications(
        applications.map((app) =>
          app._id === selectedApp._id ? { ...app, feedback } : app
        )
      );
      setSelectedApp(null);
      setFeedback("");
      document.getElementById("feedback_modal").close();

      Swal.fire({
        title: "Success!",
        text: "Feedback has been added successfully",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error adding feedback:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add feedback. Please try again.",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    }
  };

  const openFeedbackModal = (app) => {
    setSelectedApp(app);
    setFeedback(app.feedback || "");
    document.getElementById("feedback_modal").showModal();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="inline mr-1" />;
      case "rejected":
        return <FaTimesCircle className="inline mr-1" />;
      case "processing":
        return <FaSpinner className="inline mr-1" />;
      default:
        return <FaClock className="inline mr-1" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-linear-to-r from-green-500 to-emerald-500";
      case "rejected":
        return "bg-linear-to-r from-red-500 to-pink-500";
      case "processing":
        return "bg-linear-to-r from-yellow-500 to-orange-500";
      default:
        return "bg-linear-to-r from-blue-500 to-cyan-500";
    }
  };

  const getPaymentColor = (status) => {
    return status === "paid"
      ? "bg-linear-to-r from-green-500 to-emerald-500"
      : "bg-linear-to-r from-red-500 to-pink-500";
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
            <MdFeedback className="text-2xl text-purple-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Manage Applications
          </h1>
          <span className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold shadow-lg">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-base-100 shadow-xl rounded-2xl border border-base-300 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border-b border-base-300">
                  <th className="text-base-content">#</th>
                  <th className="text-base-content">Applicant</th>
                  <th className="text-base-content">University</th>
                  <th className="text-base-content">Degree</th>
                  <th className="text-base-content">Status</th>
                  <th className="text-base-content">Payment</th>
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
                        {app.userName}
                      </div>
                      <div className="text-sm text-base-content opacity-60">
                        {app.userEmail}
                      </div>
                    </td>
                    <td className="font-semibold text-base-content">
                      {app.universityName}
                    </td>
                    <td>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {app.degree}
                      </span>
                    </td>
                    <td>
                      <select
                        className="select select-sm bg-base-200 border-base-300 text-base-content font-semibold transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        value={app.applicationStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            app._id,
                            e.target.value,
                            app.userName
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <span
                        className={`px-3 py-1 ${getPaymentColor(
                          app.paymentStatus
                        )} text-white rounded-full text-xs font-semibold shadow-md capitalize`}
                      >
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => openFeedbackModal(app)}
                        className="px-3 py-2 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white text-xs flex items-center gap-1 transition-all hover:scale-105"
                      >
                        <FaCommentDots />
                        {app.feedback ? "Edit" : "Add"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <dialog id="feedback_modal" className="modal">
        <div className="modal-box bg-base-100 border border-base-300 transition-colors duration-300">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-3 text-base-content">
            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <MdFeedback className="text-white" />
            </div>
            {selectedApp?.feedback ? "Edit Feedback" : "Add Feedback"}
          </h3>

          {selectedApp && (
            <div className="mb-4 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 transition-colors duration-300">
              <p className="text-sm text-base-content opacity-60 mb-1">
                Applicant
              </p>
              <p className="font-bold text-base-content">
                {selectedApp?.userName}
              </p>
              <p className="text-sm text-base-content opacity-60">
                {selectedApp?.userEmail}
              </p>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-base-content">
                Feedback Message
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <label className="label">
              <span className="label-text-alt text-base-content opacity-60">
                Provide constructive feedback to help the applicant
              </span>
            </label>
          </div>

          <div className="modal-action">
            <button
              onClick={handleFeedbackSubmit}
              className="px-6 py-2.5 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <FaCheckCircle />
              Submit Feedback
            </button>
            <form method="dialog">
              <button className="px-6 py-2.5 rounded-xl font-semibold text-base-content hover:bg-base-200 transition-all flex items-center gap-2">
                <FaTimes />
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default ManageApplications;
