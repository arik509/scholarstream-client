import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const { data } = await axiosInstance.get('/api/scholarships?limit=1000');
      setScholarships(data.scholarships);
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load scholarships',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDelete = async (id, scholarshipName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${scholarshipName}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/scholarships/${id}`);
        setScholarships(scholarships.filter(s => s._id !== id));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Scholarship has been deleted successfully',
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting scholarship:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete scholarship. Please try again.',
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Scholarships</h1>
        <Link to="/dashboard/add-scholarship" className="btn btn-primary gap-2">
          <FaPlus />
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
                        <button className="btn btn-info btn-sm gap-1">
                          <FaEdit />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(scholarship._id, scholarship.scholarshipName)}
                          className="btn btn-error btn-sm gap-1"
                        >
                          <FaTrash />
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
