import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';
import Swal from 'sweetalert2';
import { FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';

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
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load reviews',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete <strong>${userName}'s</strong> review. This action cannot be undone!`,
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
          text: 'Review has been deleted successfully',
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
        <h1 className="text-3xl font-bold text-gray-800">All Reviews</h1>
        <span className="badge badge-primary badge-lg">{reviews.length}</span>
      </div>

      {reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center py-12">
            <MdRateReview className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No reviews available yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2">
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
                  <div className="flex gap-1 my-2">
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
                </div>

                <p className="text-gray-700 italic">"{review.reviewComment}"</p>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    📅 {new Date(review.reviewDate).toLocaleDateString()}
                  </div>
                  <button 
                    onClick={() => handleDelete(review._id, review.userName)}
                    className="btn btn-error btn-sm gap-1"
                  >
                    <FaTrash />
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
