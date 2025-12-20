import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axiosInstance from '../config/api';
import StripePaymentForm from '../components/StripePaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  
  const existingApplicationId = location.state?.applicationId;

  useEffect(() => {
    fetchScholarship();
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/scholarships/${id}`);
      setScholarship(data);
      
      // Create payment intent
      const amount = data.applicationFees + data.serviceCharge;
      const paymentIntent = await axiosInstance.post('/api/create-payment-intent', { amount });
      setClientSecret(paymentIntent.data.clientSecret);
    } catch (error) {
      console.error('Error fetching scholarship:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      if (existingApplicationId) {
        // Update existing application
        await axiosInstance.patch(`/api/applications/${existingApplicationId}/payment`, {
          paymentStatus: 'paid'
        });
      } else {
        // Create new application
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

      navigate('/payment-success', { 
        state: { 
          scholarship,
          amount: scholarship.applicationFees + scholarship.serviceCharge 
        } 
      });
    } catch (error) {
      console.error('Error saving application:', error);
      alert('Payment successful but failed to save application. Please contact support.');
    }
  };

  const handlePaymentError = async (errorMessage) => {
    try {
      if (!existingApplicationId) {
        // Create application with unpaid status
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
        
        navigate('/payment-failed', { 
          state: { 
            scholarship,
            error: errorMessage,
            applicationId: data.insertedId
          } 
        });
      } else {
        navigate('/payment-failed', { 
          state: { 
            scholarship,
            error: errorMessage,
            applicationId: existingApplicationId
          } 
        });
      }
    } catch (error) {
      console.error('Error handling payment failure:', error);
    }
  };

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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {existingApplicationId ? 'Retry Payment' : 'Payment Checkout'}
            </h1>

            {existingApplicationId && (
              <div className="alert alert-warning mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Retrying payment for existing application</span>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span className="font-semibold">Scholarship:</span>
                <span>{scholarship.scholarshipName}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span className="font-semibold">University:</span>
                <span>{scholarship.universityName}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span className="font-semibold">Applicant:</span>
                <span>{user.displayName}</span>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span>Application Fee:</span>
                <span>${scholarship.applicationFees}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-base-200 rounded-lg">
                <span>Service Charge:</span>
                <span>${scholarship.serviceCharge}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-primary text-white rounded-lg text-lg font-bold">
                <span>Total Amount:</span>
                <span>${scholarship.applicationFees + scholarship.serviceCharge}</span>
              </div>
            </div>

            <div className="divider">Payment Details</div>

            {clientSecret && (
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
