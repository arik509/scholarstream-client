import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import axiosInstance from '../../../config/api';
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await axiosInstance.delete(`/api/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
      alert('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
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
      alert('Please write a review comment');
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
      alert('Review updated successfully!');
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Reviews</h1>

      {reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <p className="text-gray-600">You haven't written any reviews yet.</p>
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
                      <td>{review.universityName}</td>
                      <td>
                        <div className="flex gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < review.ratingPoint ? '⭐' : '☆'}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="max-w-xs truncate">{review.reviewComment}</td>
                      <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditModal(review)}
                            className="btn  btn-sm"
                          >
                            <MdEdit />
                          </button>
                          <button 
                            onClick={() => handleDelete(review._id)}
                            className="btn btn-error btn-sm"
                          >
                            <MdDeleteForever /> Delete
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
          <h3 className="font-bold text-lg mb-4">Edit Review</h3>
          {editingReview && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">{editingReview.universityName}</p>
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
                      onClick={() => setEditData({ ...editData, ratingPoint: star })}
                      className="text-3xl"
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
            <button onClick={handleUpdateReview} className="btn btn-primary">
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
