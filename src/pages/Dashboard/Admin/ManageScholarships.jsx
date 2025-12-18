import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';
import { Link } from 'react-router';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarships();
  }, []);

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

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this scholarship?')) return;

    try {
      await axiosInstance.delete(`/api/scholarships/${id}`);
      setScholarships(scholarships.filter(s => s._id !== id));
      alert('Scholarship deleted successfully!');
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      alert('Failed to delete scholarship');
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Scholarships</h1>
        <Link to="/dashboard/add-scholarship" className="btn btn-primary">
          Add New Scholarship
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Scholarship</th>
                  <th>University</th>
                  <th>Category</th>
                  <th>Degree</th>
                  <th>Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship, index) => (
                  <tr key={scholarship._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="font-bold">{scholarship.scholarshipName}</div>
                      <div className="text-sm text-gray-500">{scholarship.subjectCategory}</div>
                    </td>
                    <td>
                      <div>{scholarship.universityName}</div>
                      <div className="text-sm text-gray-500">{scholarship.universityCountry}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{scholarship.scholarshipCategory}</span>
                    </td>
                    <td>{scholarship.degree}</td>
                    <td>${scholarship.applicationFees}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-info btn-sm">Edit</button>
                        <button 
                          onClick={() => handleDelete(scholarship._id)}
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
    </div>
  );
};

export default ManageScholarships;
