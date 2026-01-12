import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import axiosInstance from "../config/api";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaGlobe,
  FaDollarSign,
  FaCalendarAlt,
  FaStar,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGraduationCap,
} from "react-icons/fa";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(false);

  useEffect(() => {
    fetchScholarshipDetails();
    fetchReviews();
    if (user?.email) {
      checkIfApplied();
    }
  }, [id, user]);

  const checkIfApplied = async () => {
    setCheckingApplication(true);
    try {
      const { data } = await axiosInstance.get(
        `/api/applications/user/${user.email}`
      );
      const applied = data.some((app) => app.scholarshipId === id);
      setHasApplied(applied);
    } catch (error) {
      console.error("Error checking application:", error);
    } finally {
      setCheckingApplication(false);
    }
  };

  const fetchScholarshipDetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/scholarships/${id}`);
      setScholarship(data);
    } catch (error) {
      console.error("Error fetching scholarship:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/reviews/scholarship/${id}`);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate("/login", { state: { from: `/scholarships/${id}` } });
      return;
    }
    navigate(`/checkout/${id}`);
  };

  const handleViewApplication = () => {
    navigate("/dashboard/my-applications");
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-base-content opacity-70 font-semibold">
            Loading scholarship details...
          </p>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-base-100 p-12 rounded-2xl shadow-xl border border-base-300"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
            <FaExclamationTriangle className="text-4xl text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-base-content mb-4">
            Scholarship not found
          </h2>
          <Link
            to="/scholarships"
            className="inline-block px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Back to Scholarships
          </Link>
        </motion.div>
      </div>
    );
  }

  const userRole = user?.role;

  return (
    <div className="min-h-screen bg-base-200 py-12 lg:py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Main Scholarship Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-2xl shadow-2xl overflow-hidden mb-8 border border-base-300 transition-colors duration-300"
        >
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-white mb-2">
                <FaUniversity className="text-xl" />
                <p className="font-bold text-lg">{scholarship.universityName}</p>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {scholarship.scholarshipName}
            </h1>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                {scholarship.scholarshipCategory}
              </span>
              <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                {scholarship.degree}
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {scholarship.subjectCategory}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* University Details */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl transition-colors duration-300">
                <h3 className="font-bold text-xl text-base-content mb-4 flex items-center gap-2">
                  <FaGraduationCap className="text-purple-600" />
                  University Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaUniversity className="text-purple-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-base-content opacity-60">
                        University
                      </p>
                      <p className="font-semibold text-base-content">
                        {scholarship.universityName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-purple-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-base-content opacity-60">
                        Location
                      </p>
                      <p className="font-semibold text-base-content">
                        {scholarship.universityCity}, {scholarship.universityCountry}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaGlobe className="text-purple-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-base-content opacity-60">
                        World Rank
                      </p>
                      <p className="font-semibold text-base-content">
                        #{scholarship.universityWorldRank}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl transition-colors duration-300">
                <h3 className="font-bold text-xl text-base-content mb-4 flex items-center gap-2">
                  <FaDollarSign className="text-blue-600" />
                  Application Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base-content opacity-70">
                      Application Fee
                    </span>
                    <span className="font-bold text-base-content">
                      ${scholarship.applicationFees}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base-content opacity-70">
                      Service Charge
                    </span>
                    <span className="font-bold text-base-content">
                      ${scholarship.serviceCharge}
                    </span>
                  </div>
                  <div className="border-t-2 border-purple-200 dark:border-purple-700 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-base-content">Total</span>
                      <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        $
                        {scholarship.applicationFees + scholarship.serviceCharge}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3">
                    <FaCalendarAlt className="text-blue-600" />
                    <div>
                      <p className="text-sm text-base-content opacity-60">
                        Deadline
                      </p>
                      <p className="font-semibold text-base-content">
                        {new Date(
                          scholarship.applicationDeadline
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tuition Fees Alert */}
            {scholarship.tuitionFees > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg mb-6 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <FaDollarSign className="text-blue-600 text-xl shrink-0" />
                  <div>
                    <p className="font-semibold text-base-content">
                      Tuition Fees
                    </p>
                    <p className="text-base-content opacity-70">
                      ${scholarship.tuitionFees}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {(!user || userRole === "Student") && (
              <div className="mt-6">
                {checkingApplication ? (
                  <button
                    className="w-full lg:w-auto px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg opacity-70 cursor-not-allowed"
                    disabled
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Checking...
                    </div>
                  </button>
                ) : hasApplied ? (
                  <button
                    onClick={handleViewApplication}
                    className="w-full lg:w-auto px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <FaCheckCircle className="text-xl" />
                      Already Applied - View Status
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={handleApply}
                    className="w-full lg:w-auto px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Apply for Scholarship
                  </button>
                )}
              </div>
            )}

            {/* Role Warning */}
            {user && (userRole === "Moderator" || userRole === "Admin") && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg transition-colors duration-300">
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-yellow-600 text-xl shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-base-content mb-1">
                      Application Restricted
                    </p>
                    <p className="text-base-content opacity-70">
                      Only students can apply for scholarships. You are logged in
                      as <strong>{userRole}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-base-100 rounded-2xl shadow-xl p-6 lg:p-8 border border-base-300 transition-colors duration-300"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-base-content mb-6 flex items-center gap-3">
            <FaStar className="text-yellow-500" />
            Student Reviews
          </h2>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                <FaStar className="text-3xl text-purple-600" />
              </div>
              <p className="text-base-content opacity-70 text-lg">
                No reviews yet. Be the first to review!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="border-b border-base-300 pb-6 last:border-0 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="avatar shrink-0">
                      <div className="w-12 h-12 rounded-full ring-2 ring-purple-500">
                        <img
                          src={
                            review.userImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt={review.userName}
                        />
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div>
                          <p className="font-bold text-base-content">
                            {review.userName}
                          </p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-sm ${
                                  i < review.ratingPoint
                                    ? "text-yellow-500"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-base-content opacity-60">
                          {new Date(review.reviewDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <p className="text-base-content opacity-80 leading-relaxed">
                        {review.reviewComment}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
