import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import axiosInstance from '../../../config/api';
import Swal from 'sweetalert2';

const AddScholarship = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    scholarshipName: '',
    universityName: '',
    universityImage: '',
    universityCountry: '',
    universityCity: '',
    universityWorldRank: '',
    subjectCategory: '',
    scholarshipCategory: 'Full fund',
    degree: 'Bachelor',
    tuitionFees: '',
    applicationFees: '',
    serviceCharge: '',
    applicationDeadline: '',
    postedUserEmail: user?.email || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const scholarshipData = {
        ...formData,
        universityWorldRank: parseInt(formData.universityWorldRank),
        tuitionFees: parseFloat(formData.tuitionFees) || 0,
        applicationFees: parseFloat(formData.applicationFees),
        serviceCharge: parseFloat(formData.serviceCharge),
        scholarshipPostDate: new Date(),
        applicationDeadline: new Date(formData.applicationDeadline)
      };

      await axiosInstance.post('/api/scholarships', scholarshipData);
      
      Swal.fire({
        title: 'Success!',
        text: 'Scholarship has been added successfully',
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        confirmButtonText: 'Great!'
      });
      
      setFormData({
        scholarshipName: '',
        universityName: '',
        universityImage: '',
        universityCountry: '',
        universityCity: '',
        universityWorldRank: '',
        subjectCategory: '',
        scholarshipCategory: 'Full fund',
        degree: 'Bachelor',
        tuitionFees: '',
        applicationFees: '',
        serviceCharge: '',
        applicationDeadline: '',
        postedUserEmail: user?.email || ''
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add scholarship. Please try again.',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Scholarship</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Scholarship Name *</span>
                </label>
                <input
                  type="text"
                  name="scholarshipName"
                  value={formData.scholarshipName}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">University Name *</span>
                </label>
                <input
                  type="text"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">University Image URL *</span>
                </label>
                <input
                  type="url"
                  name="universityImage"
                  value={formData.universityImage}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Country *</span>
                </label>
                <input
                  type="text"
                  name="universityCountry"
                  value={formData.universityCountry}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">City *</span>
                </label>
                <input
                  type="text"
                  name="universityCity"
                  value={formData.universityCity}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">World Rank *</span>
                </label>
                <input
                  type="number"
                  name="universityWorldRank"
                  value={formData.universityWorldRank}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject Category *</span>
                </label>
                <input
                  type="text"
                  name="subjectCategory"
                  value={formData.subjectCategory}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science, Engineering"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Scholarship Category *</span>
                </label>
                <select
                  name="scholarshipCategory"
                  value={formData.scholarshipCategory}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="Full fund">Full fund</option>
                  <option value="Partial">Partial</option>
                  <option value="Self-fund">Self-fund</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Degree *</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="select select-bordered"
                  required
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Masters">Masters</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Tuition Fees (Optional)</span>
                </label>
                <input
                  type="number"
                  name="tuitionFees"
                  value={formData.tuitionFees}
                  onChange={handleChange}
                  className="input input-bordered"
                  placeholder="0"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Application Fees *</span>
                </label>
                <input
                  type="number"
                  name="applicationFees"
                  value={formData.applicationFees}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Service Charge *</span>
                </label>
                <input
                  type="number"
                  name="serviceCharge"
                  value={formData.serviceCharge}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Application Deadline *</span>
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Adding...
                  </>
                ) : (
                  'Add Scholarship'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddScholarship;
