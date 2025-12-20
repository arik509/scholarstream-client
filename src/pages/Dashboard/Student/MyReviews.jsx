import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import axiosInstance from '../../../config/api';
import Swal from 'sweetalert2';
import { MdEdit, MdDeleteForever, MdRateReview } from "react-icons/md";
import { FaStar, FaRegStar, FaPaperPlane } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editData, setEditData] = useState({
    ratingPoint: 5,
    reviewComment: ''
  });

  useEffect(() => {
    if (user?.email) {
      fetchReviews();
    }
  }, [user]);

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/reviews/user/${user.email}`);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load your reviews',
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
      html: `You are about to delete your review for <strong>${universityName}</strong>. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/reviews/${id}`);
        setReviews(reviews.filter(r => r._id !== id));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Your review has been deleted successfully',
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting review:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete review. Please try again.',
          icon: 'error',
          confirmButtonColor: '#8b5cf6'
        });
      }
    }
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setEditData({
      ratingPoint: review.ratingPoint,
      reviewComment: review.reviewComment
    });
    document.getElementById('edit_modal').showModal();
  };

  const handleUpdateReview = async () => {
    if (!editData.reviewComment.trim()) {
      Swal.fire({
        title: 'Missing Comment!',
        text: 'Please write a review comment before updating',
        icon: 'warning',
        confirmButtonColor: '#8b5cf6'
      });
      return;
    }

    try {
      await axiosInstance.patch(`/api/reviews/${editingReview._id}`, editData);
      setReviews(reviews.map(r => 
        r._id === editingReview._id 
          ? { ...r, ...editData } 
          : r
      ));
      document.getElementById('edit_modal').close();
      
      Swal.fire({
        title: 'Updated!',
        text: 'Your review has been updated successfully',
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating review:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update review. Please try again.',
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
        <MdRateReview className="text-4xl text-primary" />
        <h1 className="text-3xl font-bold text-gray-800">My Reviews</h1>
        {reviews.length > 0 && (
          <span className="badge badge-primary badge-lg">{reviews.length}</span>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center py-12">
            <MdRateReview className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">You haven't written any reviews yet.</p>
            <p className="text-sm text-gray-500 mt-2">Complete your applications to leave reviews!</p>
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
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={review._id}>
                      <th>{index + 1}</th>
                      <td className="font-semibold">{review.universityName}</td>
                      <td>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-500">
                              {i < review.ratingPoint ? (
                                <FaStar className="inline" />
                              ) : (
                                <FaRegStar className="inline" />
                              )}
                            </span>
                          ))}
                          <span className="ml-2 text-sm text-gray-600 font-semibold">
                            {review.ratingPoint}/5
                          </span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate italic">"{review.reviewComment}"</td>
                      <td className="text-sm">{new Date(review.reviewDate).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditModal(review)}
                            className="btn btn-warning btn-sm gap-1"
                          >
                            <MdEdit />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(review._id, review.universityName)}
                            className="btn btn-error btn-sm gap-1"
                          >
                            <MdDeleteForever />
                            Delete
                          </button>
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

      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MdEdit className="text-warning" />
            Edit Review
          </h3>
          {editingReview && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-primary mb-2">{editingReview.universityName}</p>
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
                      onClick={() => setEditData({ ...editData, ratingPoint: star })}
                      className="text-3xl transition-transform hover:scale-110"
                    >
                      {star <= editData.ratingPoint ? '⭐' : '☆'}
                    </button>
                  ))}
                  <span className="ml-2 font-semibold">{editData.ratingPoint}/5</span>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Review Comment</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-24"
                  placeholder="Update your review..."
                  value={editData.reviewComment}
                  onChange={(e) => setEditData({ ...editData, reviewComment: e.target.value })}
                ></textarea>
              </div>
            </div>
          )}
          <div className="modal-action">
            <button onClick={handleUpdateReview} className="btn btn-primary gap-2">
              <FaPaperPlane />
              Update Review
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

export default MyReviews;
