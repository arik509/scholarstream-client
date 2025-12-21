import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import axiosInstance from '../config/api';

const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axiosInstance.get('/api/scholarships');
        const topSix = data.scholarships.slice(0, 6);  // ✅ Fixed
        setScholarships(topSix);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Scholarships</h2>
            <p className="text-gray-600 text-lg">Explore the most popular scholarship opportunities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="skeleton h-96 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top Scholarships</h2>
          <p className="text-gray-600 text-lg">Explore the most popular scholarship opportunities</p>
        </div>
        
        {scholarships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No scholarships available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((scholarship) => (
                <div key={scholarship._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                  <figure className="h-48 overflow-hidden">
                    <img 
                      src={scholarship.universityImage} 
                      alt={scholarship.universityName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-xl font-bold text-gray-800">
                      {scholarship.scholarshipName}
                    </h3>
                    <p className="text-gray-600">{scholarship.universityName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <span>📍 {scholarship.universityCity}, {scholarship.universityCountry}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="badge badge-primary">{scholarship.scholarshipCategory}</div>
                      <div className="badge badge-secondary">{scholarship.degree}</div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Application Fee: <span className="font-bold text-primary">${scholarship.applicationFees}</span>
                      </p>
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link to={`/scholarships/${scholarship._id}`} className="btn btn-primary btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/scholarships" className="btn btn-primary btn-lg">
                View All Scholarships
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TopScholarships;
