import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import axiosInstance from '../../../config/api';
import Swal from 'sweetalert2';
import { FaEye, FaCreditCard, FaEdit, FaTrash, FaStar, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';

const MyApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    ratingPoint: 5,
    reviewComment: ''
  });

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/applications/user/${user.email}`);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load your applications',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, universityName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete your application to <strong>${universityName}</strong>. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/applications/${id}`);
        setApplications(applications.filter(app => app._id !== id));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Your application has been deleted successfully',
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting application:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete application. Please try again.',
          icon: 'error',
          confirmButtonColor: '#8b5cf6'
        });
      }
    }
  };

  const handlePay = (app) => {
    navigate(`/checkout/${app.scholarshipId}`, { 
      state: { applicationId: app._id } 
    });
  };

  const openDetailsModal = (app) => {
    setSelectedApp(app);
    document.getElementById('details_modal').showModal();
  };

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setReviewData({ ratingPoint: 5, reviewComment: '' });
    document.getElementById('review_modal').showModal();
  };

  const handleSubmitReview = async () => {
    if (!reviewData.reviewComment.trim()) {
      Swal.fire({
        title: 'Missing Review!',
        text: 'Please write a review comment before submitting',
        icon: 'warning',
        confirmButtonColor: '#8b5cf6'
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
        reviewDate: new Date()
      };

      await axiosInstance.post('/api/reviews', review);
      document.getElementById('review_modal').close();
      
      Swal.fire({
        title: 'Thank You!',
        text: 'Your review has been submitted successfully',
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 2000,
        showConfirmButton: false
      });
      
      setReviewData({ ratingPoint: 5, reviewComment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to submit review. Please try again.',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
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
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>
        {applications.length > 0 && (
          <span className="badge badge-primary badge-lg">{applications.length}</span>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 text-lg">You haven't applied to any scholarships yet.</p>
            <button 
              onClick={() => navigate('/scholarships')}
              className="btn btn-primary mt-4"
            >
              Browse Scholarships
            </button>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>University</th>
                    <th>Category</th>
                    <th>Fees</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Feedback</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="font-bold">{app.universityName}</div>
                        <div className="text-sm text-gray-500">{app.degree}</div>
                      </td>
                      <td>
                        <span className="badge badge-primary text-[14px] md:text-[16px]">{app.scholarshipCategory}</span>
                      </td>
                      <td>${app.applicationFees}</td>
                      <td>
                        <span className={`badge ${
                          app.applicationStatus === 'completed' ? 'badge-success' :
                          app.applicationStatus === 'processing' ? 'badge-warning' :
                          app.applicationStatus === 'rejected' ? 'badge-error' :
                          'badge-info'
                        }`}>
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          app.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'
                        }`}>
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <div className="max-w-xs truncate">
                          {app.feedback || 'No feedback yet'}
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => openDetailsModal(app)}
                            className="btn btn-info btn-xs gap-1"
                          >
                            <FaEye className="text-sm" />
                            Details
                          </button>
                          
                          {app.applicationStatus === 'pending' && app.paymentStatus === 'unpaid' && (
                            <button 
                              onClick={() => handlePay(app)}
                              className="btn btn-success btn-xs gap-1"
                            >
                              <FaCreditCard className="text-sm" />
                              Pay
                            </button>
                          )}
                          
                          {app.applicationStatus === 'pending' && (
                            <>
                              <button className="btn btn-warning btn-xs gap-1">
                                <FaEdit className="text-sm" />
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(app._id, app.universityName)}
                                className="btn btn-error btn-xs gap-1"
                              >
                                <FaTrash className="text-sm" />
                                Delete
                              </button>
                            </>
                          )}
                          
                          {app.applicationStatus === 'completed' && (
                            <button 
                              onClick={() => openReviewModal(app)}
                              className="btn btn-primary btn-xs gap-1"
                            >
                              <MdRateReview className="text-sm" />
                              Add Review
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

      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FaEye className="text-info" />
            Application Details
          </h3>
          {selectedApp && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">University Name</p>
                  <p className="font-semibold">{selectedApp.universityName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scholarship Category</p>
                  <p className="font-semibold">{selectedApp.scholarshipCategory}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Degree</p>
                  <p className="font-semibold">{selectedApp.degree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Fees</p>
                  <p className="font-semibold">${selectedApp.applicationFees}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service Charge</p>
                  <p className="font-semibold">${selectedApp.serviceCharge}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="font-semibold text-primary">${selectedApp.applicationFees + selectedApp.serviceCharge}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Status</p>
                  <p className="font-semibold">{selectedApp.applicationStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <p className="font-semibold">{selectedApp.paymentStatus}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Application Date</p>
                  <p className="font-semibold">{new Date(selectedApp.applicationDate).toLocaleDateString()}</p>
                </div>
                {selectedApp.feedback && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Moderator Feedback</p>
                    <p className="font-semibold">{selectedApp.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn gap-2">
                <FaTimes />
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MdRateReview className="text-primary" />
            Add Review
          </h3>
          {selectedApp && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">{selectedApp.universityName}</p>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    Rating
                  </span>
                </label>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, ratingPoint: star })}
                      className="text-3xl transition-transform hover:scale-110"
                    >
                      {star <= reviewData.ratingPoint ? '⭐' : '☆'}
                    </button>
                  ))}
                  <span className="ml-2 font-semibold">{reviewData.ratingPoint}/5</span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Review Comment</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Share your experience with this scholarship..."
                  value={reviewData.reviewComment}
                  onChange={(e) => setReviewData({ ...reviewData, reviewComment: e.target.value })}
                ></textarea>
              </div>
            </div>
          )}
          <div className="modal-action">
            <button onClick={handleSubmitReview} className="btn btn-primary gap-2">
              <FaPaperPlane />
              Submit Review
            </button>
            <form method="dialog">
              <button className="btn gap-2">
                <FaTimes />
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
