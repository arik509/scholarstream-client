import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../config/api';
import StripePaymentForm from '../components/StripePaymentForm';
import Swal from 'sweetalert2';
import { FaUniversity, FaUser, FaMoneyBillWave, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import { MdPayment, MdWarning } from 'react-icons/md';

// Safe Stripe initialization with error handling
let stripePromise = null;
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (stripeKey && (stripeKey.startsWith('pk_test_') || stripeKey.startsWith('pk_live_'))) {
  try {
    stripePromise = loadStripe(stripeKey);
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
} else {
  console.error('Invalid or missing Stripe publishable key');
}

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
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
      const paymentIntent = await axiosInstance.post('/api/create-payment-intent', { amount });
      setClientSecret(paymentIntent.data.clientSecret);
    } catch (error) {
      console.error('Error fetching scholarship:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load scholarship details',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      }).then(() => {
        navigate('/scholarships');
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      if (existingApplicationId) {
        await axiosInstance.patch(`/api/applications/${existingApplicationId}/payment`, {
          paymentStatus: 'paid'
        });
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
          applicationStatus: 'pending',
          paymentStatus: 'paid',
          applicationDate: new Date(),
          feedback: ''
        };
        await axiosInstance.post('/api/applications', applicationData);
      }

      Swal.fire({
        title: 'Payment Successful!',
        html: `
          <div class="text-center">
            <p class="text-lg mb-2">Your application has been submitted successfully!</p>
            <p class="text-sm text-gray-600">Amount paid: <strong>$${scholarship.applicationFees + scholarship.serviceCharge}</strong></p>
            <p class="text-sm text-gray-500 mt-2">Redirecting...</p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false
      }).then(() => {
        navigate('/payment-success', { 
          state: { 
            scholarship,
            amount: scholarship.applicationFees + scholarship.serviceCharge 
          } 
        });
      });
    } catch (error) {
      console.error('Error saving application:', error);
      Swal.fire({
        title: 'Warning!',
        text: 'Payment successful but failed to save application. Please contact support.',
        icon: 'warning',
        confirmButtonColor: '#8b5cf6'
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
          applicationStatus: 'pending',
          paymentStatus: 'unpaid',
          applicationDate: new Date(),
          feedback: ''
        };
        const { data } = await axiosInstance.post('/api/applications', applicationData);
        applicationId = data.insertedId;
      }

      Swal.fire({
        title: 'Payment Failed!',
        html: `
          <div class="text-center">
            <p class="text-lg mb-2">Your payment could not be processed</p>
            <p class="text-sm text-gray-600 mb-2">${errorMessage}</p>
            <p class="text-sm text-gray-500">Redirecting...</p>
          </div>
        `,
        icon: 'error',
        confirmButtonColor: '#8b5cf6',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false
      }).then(() => {
        navigate('/payment-failed', { 
          state: { 
            scholarship,
            error: errorMessage,
            applicationId: applicationId
          } 
        });
      });
    } catch (error) {
      console.error('Error handling payment failure:', error);
      Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred. Please contact support.',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    }
  };

  // Show error screen if Stripe failed to load
  if (stripeError) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="card bg-base-100 shadow-xl max-w-lg">
          <div className="card-body text-center">
            <MdWarning className="text-6xl text-error mx-auto mb-4" />
            <h2 className="card-title text-error justify-center text-2xl">Payment System Unavailable</h2>
            <div className="divider"></div>
            <p className="text-gray-700 mb-4">Unable to load the payment system. This could be due to:</p>
            <ul className="text-left text-sm space-y-2 bg-base-200 p-4 rounded-lg">
              <li>❌ Missing or invalid Stripe API key</li>
              <li>❌ Network or firewall blocking Stripe</li>
              <li>❌ Browser extensions blocking payment scripts</li>
              <li>❌ Ad blocker interference</li>
            </ul>
            <div className="alert alert-info mt-4">
              <span className="text-sm">Please check your connection and try again, or contact support.</span>
            </div>
            <div className="card-actions justify-center mt-4 gap-2">
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Retry
              </button>
              <button 
                onClick={() => navigate('/scholarships')} 
                className="btn btn-outline gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <MdPayment className="text-4xl text-primary" />
              <h1 className="text-3xl font-bold text-gray-800">
                {existingApplicationId ? 'Retry Payment' : 'Payment Checkout'}
              </h1>
            </div>

            {existingApplicationId && (
              <div className="alert alert-warning mb-4">
                <MdWarning className="text-xl" />
                <span>Retrying payment for existing application</span>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span className="font-semibold flex items-center gap-2">
                  <FaCheckCircle className="text-primary" />
                  Scholarship:
                </span>
                <span className="text-right">{scholarship.scholarshipName}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span className="font-semibold flex items-center gap-2">
                  <FaUniversity className="text-primary" />
                  University:
                </span>
                <span className="text-right">{scholarship.universityName}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span className="font-semibold flex items-center gap-2">
                  <FaUser className="text-primary" />
                  Applicant:
                </span>
                <span className="text-right">{user.displayName}</span>
              </div>

              <div className="divider">
                <FaMoneyBillWave className="text-primary text-xl" />
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span>Application Fee:</span>
                <span className="font-semibold">${scholarship.applicationFees}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span>Service Charge:</span>
                <span className="font-semibold">${scholarship.serviceCharge}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-primary text-white rounded-lg text-lg font-bold">
                <span className="flex items-center gap-2">
                  <FaCreditCard />
                  Total Amount:
                </span>
                <span>${scholarship.applicationFees + scholarship.serviceCharge}</span>
              </div>
            </div>

            <div className="divider">
              <FaCreditCard className="text-primary text-xl" />
              <span className="font-semibold">Payment Details</span>
            </div>

            {clientSecret && stripePromise && (
              <Elements stripe={stripePromise} options={options}>
                <StripePaymentForm 
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  amount={scholarship.applicationFees + scholarship.serviceCharge}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
