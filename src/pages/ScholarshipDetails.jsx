import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../config/api';

const ScholarshipDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarshipDetails();
    fetchReviews();
  }, [id]);

  const fetchScholarshipDetails = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/scholarships/${id}`);
      setScholarship(data);
    } catch (error) {
      console.error('Error fetching scholarship:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/reviews/scholarship/${id}`);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login', { state: { from: `/scholarships/${id}` } });
      return;
    }
    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Scholarship not found</h2>
          <Link to="/scholarships" className="btn btn-primary mt-4">
            Back to Scholarships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="card bg-base-100 shadow-2xl mb-8">
          <figure className="h-64 md:h-96">
            <img 
              src={scholarship.universityImage} 
              alt={scholarship.universityName}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {scholarship.scholarshipName}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="badge badge-primary badge-lg">{scholarship.scholarshipCategory}</div>
              <div className="badge badge-secondary badge-lg">{scholarship.degree}</div>
              <div className="badge badge-accent badge-lg">{scholarship.subjectCategory}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">University Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">University:</span> {scholarship.universityName}</p>
                  <p><span className="font-medium">Location:</span> {scholarship.universityCity}, {scholarship.universityCountry}</p>
                  <p><span className="font-medium">World Rank:</span> #{scholarship.universityWorldRank}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Application Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Application Fee:</span> ${scholarship.applicationFees}</p>
                  <p><span className="font-medium">Service Charge:</span> ${scholarship.serviceCharge}</p>
                  <p><span className="font-medium">Total:</span> <span className="text-primary font-bold">${scholarship.applicationFees + scholarship.serviceCharge}</span></p>
                  <p><span className="font-medium">Deadline:</span> {new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {scholarship.tuitionFees > 0 && (
              <div className="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Tuition Fees: ${scholarship.tuitionFees}</span>
              </div>
            )}

            <div className="card-actions justify-end mt-6">
              <button onClick={handleApply} className="btn btn-primary btn-lg">
                Apply for Scholarship
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Student Reviews</h2>
            
            {reviews.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src={review.userImage || 'https://via.placeholder.com/150'} alt={review.userName} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{review.userName}</p>
                        <div className="flex gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.ratingPoint ? '⭐' : '☆'}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 ml-auto">
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-700 ml-15">{review.reviewComment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
