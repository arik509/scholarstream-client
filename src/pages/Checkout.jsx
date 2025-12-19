import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../config/api';

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  // Get applicationId from state if it's a retry payment
  const existingApplicationId = location.state?.applicationId;

  useEffect(() => {
    fetchScholarship();
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/scholarships/${id}`);
      setScholarship(data);
    } catch (error) {
      console.error('Error fetching scholarship:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);

    try {
      // Simulate payment (70% success rate)
      const paymentSuccess = Math.random() > 0.3;

      if (existingApplicationId) {
        // RETRY PAYMENT - Update existing application
        if (paymentSuccess) {
          await axiosInstance.patch(`/api/applications/${existingApplicationId}/payment`, {
            paymentStatus: 'paid'
          });
          navigate('/payment-success', { 
            state: { 
              scholarship,
              amount: scholarship.applicationFees + scholarship.serviceCharge 
            } 
          });
        } else {
          navigate('/payment-failed', { 
            state: { 
              scholarship,
              error: 'Payment processing failed. Please try again.',
              applicationId: existingApplicationId
            } 
          });
        }
      } else {
        // NEW APPLICATION
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
          paymentStatus: paymentSuccess ? 'paid' : 'unpaid',
          applicationDate: new Date(),
          feedback: ''
        };

        const { data } = await axiosInstance.post('/api/applications', applicationData);

        if (paymentSuccess) {
          navigate('/payment-success', { 
            state: { 
              scholarship,
              amount: scholarship.applicationFees + scholarship.serviceCharge 
            } 
          });
        } else {
          navigate('/payment-failed', { 
            state: { 
              scholarship,
              error: 'Payment processing failed. Please try again.',
              applicationId: data.insertedId
            } 
          });
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process application. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

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

            <div className="alert alert-info mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>This is a demo payment. Click "Pay Now" to simulate payment processing.</span>
            </div>

            <div className="card-actions justify-end">
              <button 
                onClick={() => navigate(-1)}
                className="btn btn-ghost"
                disabled={processing}
              >
                Cancel
              </button>
              <button 
                onClick={handlePayment}
                className="btn btn-primary"
                disabled={processing}
              >
                {processing ? <span className="loading loading-spinner"></span> : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
