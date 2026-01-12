import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../config/api";
import StripePaymentForm from "../components/StripePaymentForm";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaUser,
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
import { MdPayment, MdWarning } from "react-icons/md";

// Safe Stripe initialization with error handling
let stripePromise = null;
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (
  stripeKey &&
  (stripeKey.startsWith("pk_test_") || stripeKey.startsWith("pk_live_"))
) {
  try {
    stripePromise = loadStripe(stripeKey);
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
  }
} else {
  console.error("Invalid or missing Stripe publishable key");
}

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [stripeError, setStripeError] = useState(false);

  const existingApplicationId = location.state?.applicationId;

  useEffect(() => {
    // Check if Stripe initialized successfully
    if (!stripePromise) {
      setStripeError(true);
      setLoading(false);
      return;
    }

    fetchScholarship();
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/scholarships/${id}`);
      setScholarship(data);

      const amount = data.applicationFees + data.serviceCharge;
      const paymentIntent = await axiosInstance.post(
        "/api/create-payment-intent",
        { amount }
      );
      setClientSecret(paymentIntent.data.clientSecret);
    } catch (error) {
      console.error("Error fetching scholarship:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load scholarship details",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      }).then(() => {
        navigate("/scholarships");
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      if (existingApplicationId) {
        await axiosInstance.patch(
          `/api/applications/${existingApplicationId}/payment`,
          {
            paymentStatus: "paid",
          }
        );
      } else {
        const applicationData = {
          scholarshipId: scholarship._id,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          universityName: scholarship.universityName,
          scholarshipCategory: scholarship.scholarshipCategory,
          degree: scholarship.degree,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge,
          applicationStatus: "pending",
          paymentStatus: "paid",
          applicationDate: new Date(),
          feedback: "",
        };
        await axiosInstance.post("/api/applications", applicationData);
      }

      Swal.fire({
        title: "Payment Successful!",
        html: `
          <div class="text-center">
            <p class="text-lg mb-2">Your application has been submitted successfully!</p>
            <p class="text-sm text-gray-600">Amount paid: <strong>$${
              scholarship.applicationFees + scholarship.serviceCharge
            }</strong></p>
            <p class="text-sm text-gray-500 mt-2">Redirecting...</p>
          </div>
        `,
        icon: "success",
        confirmButtonColor: "#8b5cf6",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
      }).then(() => {
        navigate("/payment-success", {
          state: {
            scholarship,
            amount: scholarship.applicationFees + scholarship.serviceCharge,
          },
        });
      });
    } catch (error) {
      console.error("Error saving application:", error);
      Swal.fire({
        title: "Warning!",
        text: "Payment successful but failed to save application. Please contact support.",
        icon: "warning",
        confirmButtonColor: "#8b5cf6",
      });
    }
  };

  const handlePaymentError = async (errorMessage) => {
    try {
      let applicationId = existingApplicationId;

      if (!existingApplicationId) {
        const applicationData = {
          scholarshipId: scholarship._id,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          universityName: scholarship.universityName,
          scholarshipCategory: scholarship.scholarshipCategory,
          degree: scholarship.degree,
          applicationFees: scholarship.applicationFees,
          serviceCharge: scholarship.serviceCharge,
          applicationStatus: "pending",
          paymentStatus: "unpaid",
          applicationDate: new Date(),
          feedback: "",
        };
        const { data } = await axiosInstance.post(
          "/api/applications",
          applicationData
        );
        applicationId = data.insertedId;
      }

      Swal.fire({
        title: "Payment Failed!",
        html: `
          <div class="text-center">
            <p class="text-lg mb-2">Your payment could not be processed</p>
            <p class="text-sm text-gray-600 mb-2">${errorMessage}</p>
            <p class="text-sm text-gray-500">Redirecting...</p>
          </div>
        `,
        icon: "error",
        confirmButtonColor: "#8b5cf6",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
      }).then(() => {
        navigate("/payment-failed", {
          state: {
            scholarship,
            error: errorMessage,
            applicationId: applicationId,
          },
        });
      });
    } catch (error) {
      console.error("Error handling payment failure:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please contact support.",
        icon: "error",
        confirmButtonColor: "#8b5cf6",
      });
    }
  };

  // Show error screen if Stripe failed to load
  if (stripeError) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-base-100 shadow-2xl max-w-lg rounded-2xl overflow-hidden border border-base-300 transition-colors duration-300"
        >
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center">
              <MdWarning className="text-4xl text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-base-content mb-4">
              Payment System Unavailable
            </h2>

            <div className="h-px bg-linear-to-r from-transparent via-base-300 to-transparent my-6"></div>

            <p className="text-base-content opacity-70 mb-4">
              Unable to load the payment system. This could be due to:
            </p>

            <ul className="text-left text-sm space-y-2 bg-base-200 p-4 rounded-lg mb-4 transition-colors duration-300">
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">❌</span>
                <span className="text-base-content opacity-70">
                  Missing or invalid Stripe API key
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">❌</span>
                <span className="text-base-content opacity-70">
                  Network or firewall blocking Stripe
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">❌</span>
                <span className="text-base-content opacity-70">
                  Browser extensions blocking payment scripts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 shrink-0">❌</span>
                <span className="text-base-content opacity-70">
                  Ad blocker interference
                </span>
              </li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg mb-6 transition-colors duration-300">
              <p className="text-sm text-base-content opacity-70">
                Please check your connection and try again, or contact support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-semibold bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Retry
              </button>
              <button
                onClick={() => navigate("/scholarships")}
                className="px-6 py-3 rounded-xl font-semibold text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-base-content opacity-70 font-semibold">
            Loading payment details...
          </p>
        </div>
      </div>
    );
  }

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300 transition-colors duration-300"
        >
          <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center transition-colors duration-300">
                <MdPayment className="text-2xl text-purple-600" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {existingApplicationId ? "Retry Payment" : "Payment Checkout"}
              </h1>
            </div>

            {/* Retry Alert */}
            {existingApplicationId && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <MdWarning className="text-xl text-yellow-600 shrink-0" />
                  <span className="text-base-content opacity-70">
                    Retrying payment for existing application
                  </span>
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-xl transition-colors duration-300">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <FaCheckCircle className="text-purple-600" />
                  Scholarship:
                </span>
                <span className="text-right text-base-content opacity-80">
                  {scholarship.scholarshipName}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-xl transition-colors duration-300">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <FaUniversity className="text-purple-600" />
                  University:
                </span>
                <span className="text-right text-base-content opacity-80">
                  {scholarship.universityName}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-xl transition-colors duration-300">
                <span className="font-semibold flex items-center gap-2 text-base-content">
                  <FaUser className="text-purple-600" />
                  Applicant:
                </span>
                <span className="text-right text-base-content opacity-80">
                  {user.displayName}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-base-300 to-transparent"></div>
              <FaMoneyBillWave className="text-purple-600 text-xl" />
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-base-300 to-transparent"></div>
            </div>

            {/* Payment Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-xl transition-colors duration-300">
                <span className="text-base-content opacity-70">
                  Application Fee:
                </span>
                <span className="font-semibold text-base-content">
                  ${scholarship.applicationFees}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-xl transition-colors duration-300">
                <span className="text-base-content opacity-70">
                  Service Charge:
                </span>
                <span className="font-semibold text-base-content">
                  ${scholarship.serviceCharge}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-bold shadow-lg">
                <span className="flex items-center gap-2">
                  <FaCreditCard />
                  Total Amount:
                </span>
                <span>
                  ${scholarship.applicationFees + scholarship.serviceCharge}
                </span>
              </div>
            </div>

            {/* Payment Form Divider */}
            <div className="flex items-center gap-3 my-8">
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-base-300 to-transparent"></div>
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-purple-600 text-xl" />
                <span className="font-semibold text-base-content">
                  Payment Details
                </span>
              </div>
              <div className="flex-1 h-px bg-linear-to-r from-transparent via-base-300 to-transparent"></div>
            </div>

            {/* Stripe Payment Form */}
            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={options}>
                <StripePaymentForm
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  amount={
                    scholarship.applicationFees + scholarship.serviceCharge
                  }
                />
              </Elements>
            )}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-base-content opacity-60">
            🔒 Your payment is secured with Stripe encryption
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
