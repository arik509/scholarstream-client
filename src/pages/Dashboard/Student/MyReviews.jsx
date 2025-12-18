import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import axiosInstance from '../../../config/api';

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
                          <button className="btn btn-info btn-sm">Edit</button>
                          <button 
                            onClick={() => handleDelete(review._id)}
                            className="btn btn-error btn-sm"
                          >
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
    </div>
  );
};

export default MyReviews;
