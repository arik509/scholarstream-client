import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import axiosInstance from '../../../config/api';

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      await axiosInstance.delete(`/api/applications/${id}`);
      setApplications(applications.filter(app => app._id !== id));
      alert('Application deleted successfully!');
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application');
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
      alert('Please write a review comment');
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
      alert('Review submitted successfully!');
      setReviewData({ ratingPoint: 5, reviewComment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <p className="text-gray-600">You haven't applied to any scholarships yet.</p>
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
                        <span className="badge badge-primary">{app.scholarshipCategory}</span>
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
                            className="btn btn-info btn-xs"
                          >
                            Details
                          </button>
                          
                          {app.applicationStatus === 'pending' && app.paymentStatus === 'unpaid' && (
                            <button 
                              onClick={() => handlePay(app)}
                              className="btn btn-success btn-xs"
                            >
                              Pay
                            </button>
                          )}
                          
                          {app.applicationStatus === 'pending' && (
                            <>
                              <button className="btn btn-warning btn-xs">
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDelete(app._id)}
                                className="btn btn-error btn-xs"
                              >
                                Delete
                              </button>
                            </>
                          )}
                          
                          {app.applicationStatus === 'completed' && (
                            <button 
                              onClick={() => openReviewModal(app)}
                              className="btn btn-primary btn-xs"
                            >
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

      {/* Details Modal */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Application Details</h3>
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
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add Review</h3>
          {selectedApp && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">{selectedApp.universityName}</p>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Rating</span>
                </label>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, ratingPoint: star })}
                      className="text-3xl"
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
            <button onClick={handleSubmitReview} className="btn btn-primary">
              Submit Review
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
