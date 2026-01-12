import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axiosInstance from "../../../config/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaPlus,
  FaUniversity,
  FaGlobe,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaGraduationCap,
} from "react-icons/fa";

const AddScholarship = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "Full fund",
    degree: "Bachelor",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    postedUserEmail: user?.email || "",
  });

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const scholarshipData = {
        ...formData,
        universityWorldRank: parseInt(formData.universityWorldRank),
        tuitionFees: parseFloat(formData.tuitionFees) || 0,
        applicationFees: parseFloat(formData.applicationFees),
        serviceCharge: parseFloat(formData.serviceCharge),
        scholarshipPostDate: new Date(),
        applicationDeadline: new Date(formData.applicationDeadline),
      };

      await axiosInstance.post("/api/scholarships", scholarshipData);

      Swal.fire({
        title: "Success!",
        text: "Scholarship has been added successfully",
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        confirmButtonText: "Great!",
      });

      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "Full fund",
        degree: "Bachelor",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        postedUserEmail: user?.email || "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error!",
        text: "Failed to add scholarship. Please try again.",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Page Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center transition-colors duration-300">
            <FaPlus className="text-2xl text-purple-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Add New Scholarship
          </h1>
        </div>
        <p className="text-base-content opacity-70 ml-15">
          Fill in the details to create a new scholarship opportunity
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        variants={itemVariants}
        className="bg-base-100 shadow-xl rounded-2xl border border-base-300 overflow-hidden transition-colors duration-300"
      >
        <div className="p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Scholarship Info Section */}
            <div>
              <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-purple-600" />
                Scholarship Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Scholarship Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="scholarshipName"
                    value={formData.scholarshipName}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., Merit-Based Excellence Scholarship"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Subject Category *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="subjectCategory"
                    value={formData.subjectCategory}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science, Engineering"
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Scholarship Category *
                    </span>
                  </label>
                  <select
                    name="scholarshipCategory"
                    value={formData.scholarshipCategory}
                    onChange={handleChange}
                    className="select select-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  >
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Degree *
                    </span>
                  </label>
                  <select
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="select select-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-base-300 to-transparent"></div>

            {/* University Info Section */}
            <div>
              <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <FaUniversity className="text-purple-600" />
                University Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      University Name *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="universityName"
                    value={formData.universityName}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., Harvard University"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      World Rank *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="universityWorldRank"
                    value={formData.universityWorldRank}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., 1"
                    required
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      University Image URL *
                    </span>
                  </label>
                  <input
                    type="url"
                    name="universityImage"
                    value={formData.universityImage}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="https://example.com/university-image.jpg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content flex items-center gap-2">
                      <FaGlobe className="text-purple-500" />
                      Country *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="universityCountry"
                    value={formData.universityCountry}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., United States"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content flex items-center gap-2">
                      <FaMapMarkerAlt className="text-purple-500" />
                      City *
                    </span>
                  </label>
                  <input
                    type="text"
                    name="universityCity"
                    value={formData.universityCity}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., Cambridge"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-linear-to-r from-transparent via-base-300 to-transparent"></div>

            {/* Financial Info Section */}
            <div>
              <h2 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                <FaDollarSign className="text-purple-600" />
                Financial Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Tuition Fees (Optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="tuitionFees"
                    value={formData.tuitionFees}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="0"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Application Fees *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="applicationFees"
                    value={formData.applicationFees}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., 50"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">
                      Service Charge *
                    </span>
                  </label>
                  <input
                    type="number"
                    name="serviceCharge"
                    value={formData.serviceCharge}
                    onChange={handleChange}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    placeholder="e.g., 10"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-500" />
                      Application Deadline *
                    </span>
                  </label>
                  <input
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    min={getTodayDate()}
                    className="input input-bordered bg-base-200 border-base-300 text-base-content transition-colors duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content opacity-60">
                      Must be a future date
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding Scholarship...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Add Scholarship
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddScholarship;
