import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setFormData(scholarship);
    document.getElementById('edit_modal').showModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    if (name === 'applicationDeadline' && value) {
      processedValue = value.split('T')[0];
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await axiosInstance.put(`/api/scholarships/${editingScholarship._id}`, formData);
      
      setScholarships(scholarships.map(s => 
        s._id === editingScholarship._id ? { ...s, ...formData } : s
      ));
      
      document.getElementById('edit_modal').close();
      
      Swal.fire({
        title: 'Updated!',
        text: 'Scholarship has been updated successfully',
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error updating scholarship:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update scholarship. Please try again.',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
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
                        <button 
                          onClick={() => handleEdit(scholarship)}
                          className="btn btn-info btn-sm gap-1"
                        >
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

      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-2xl">Edit Scholarship</h3>
            <button 
              onClick={() => document.getElementById('edit_modal').close()}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <FaTimes />
            </button>
          </div>
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Scholarship Name</span>
                </label>
                <input
                  type="text"
                  name="scholarshipName"
                  value={formData.scholarshipName || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">University Name</span>
                </label>
                <input
                  type="text"
                  name="universityName"
                  value={formData.universityName || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">University Country</span>
                </label>
                <input
                  type="text"
                  name="universityCountry"
                  value={formData.universityCountry || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">University City</span>
                </label>
                <input
                  type="text"
                  name="universityCity"
                  value={formData.universityCity || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject Category</span>
                </label>
                <input
                  type="text"
                  name="subjectCategory"
                  value={formData.subjectCategory || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Scholarship Category</span>
                </label>
                <select
                  name="scholarshipCategory"
                  value={formData.scholarshipCategory || ''}
                  onChange={handleInputChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Full fund">Full fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Degree</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree || ''}
                  onChange={handleInputChange}
                  className="select select-bordered"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Application Fees ($)</span>
                </label>
                <input
                  type="number"
                  name="applicationFees"
                  value={formData.applicationFees || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                  min="0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Application Deadline</span>
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Service Charge ($)</span>
                </label>
                <input
                  type="number"
                  name="serviceCharge"
                  value={formData.serviceCharge || ''}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Scholarship Description</span>
              </label>
              <textarea
                name="scholarshipDescription"
                value={formData.scholarshipDescription || ''}
                onChange={handleInputChange}
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>

            <div className="modal-action">
              <button 
                type="button"
                onClick={() => document.getElementById('edit_modal').close()}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Scholarship
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;
