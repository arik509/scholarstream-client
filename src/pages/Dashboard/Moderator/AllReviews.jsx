import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get('/api/reviews');
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Reviews</h1>

      {reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <p className="text-gray-600">No reviews available yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img src={review.userImage || 'https://via.placeholder.com/150'} alt={review.userName} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">{review.userName}</h3>
                    <p className="text-sm text-gray-500">{review.userEmail}</p>
                  </div>
                </div>

                <div className="mb-2">
                  <p className="font-semibold text-primary">{review.universityName}</p>
                  <div className="flex gap-1 text-yellow-500 my-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < review.ratingPoint ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-700">{review.reviewComment}</p>

                <div className="text-sm text-gray-500 mt-2">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </div>

                <div className="card-actions justify-end mt-4">
                  <button 
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
