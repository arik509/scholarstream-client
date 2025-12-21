import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axiosInstance from '../config/api';

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  useEffect(() => {
    fetchScholarships();
  }, [search, country, category, sort, currentPage]);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 9,
        ...(search && { search }),
        ...(country && { country }),
        ...(category && { category }),
        ...(sort && { sort })
      });

      const { data } = await axiosInstance.get(`/api/scholarships?${params}`);
      setScholarships(data.scholarships);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchInput('');
    setSearch('');
    setCountry('');
    setCategory('');
    setSort('');
    setCurrentPage(1);
  };

  if (loading && scholarships.length === 0) {
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
          <p className="text-gray-600 text-lg">
            Found <span className="font-bold text-primary">{total}</span> scholarship opportunities
          </p>
        </div>

        <div className="card bg-white shadow-xl mb-8">
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              
              <div className="form-control lg:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Search</span>
                </label>
                <input
                  type="text"
                  placeholder="Name, University, Degree..."
                  className="input input-bordered"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Country</span>
                </label>
                <select
                  className="select select-bordered"
                  value={country}
                  onChange={(e) => { setCountry(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">All Countries</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">All Categories</option>
                  <option value="Full fund">Full Fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Sort By</span>
                </label>
                <select
                  className="select select-bordered"
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
                >
                  <option value="">Default</option>
                  <option value="fees-asc">Fees: Low to High</option>
                  <option value="fees-desc">Fees: High to Low</option>
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={handleReset} className="btn btn-outline btn-sm">
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : scholarships.length === 0 ? (
          <div className="card bg-white shadow-xl">
            <div className="card-body text-center py-12">
              <p className="text-gray-600 text-xl">No scholarships found</p>
              <button onClick={handleReset} className="btn btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.map((scholarship) => (
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

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="join">
                  <button
                    className="join-item btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    «
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    className="join-item btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
