import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../config/api';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axiosInstance.get('/api/scholarships');
        setScholarships(data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const filteredScholarships = scholarships.filter(scholarship =>
    scholarship.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scholarship.degree.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">All Scholarships</h1>
          <p className="text-gray-600 text-lg">Browse all available scholarship opportunities</p>
        </div>

        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by scholarship name, university, or degree..."
            className="input input-bordered w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredScholarships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-xl">No scholarships found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScholarships.map((scholarship) => (
              <div key={scholarship._id} className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
