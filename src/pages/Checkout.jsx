import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../config/api';

const Checkout = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

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

    try {
      const paymentSuccess = Math.random() > 0.3;

      if (paymentSuccess) {
        applicationData.paymentStatus = 'paid';
        await axiosInstance.post('/api/applications', applicationData);
        navigate('/payment-success', { 
          state: { 
            scholarship,
            amount: scholarship.applicationFees + scholarship.serviceCharge 
          } 
        });
      } else {
        await axiosInstance.post('/api/applications', applicationData);
        navigate('/payment-failed', { 
          state: { 
            scholarship,
            error: 'Payment processing failed. Please try again.' 
          } 
        });
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Checkout</h1>

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
