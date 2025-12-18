import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import axiosInstance from '../../../config/api';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/applications/user/${user.email}`);
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>

      {applications.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <p className="text-gray-600">You haven't applied to any scholarships yet.</p>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>University</th>
                    <th>Category</th>
                    <th>Fees</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app._id}>
                      <th>{index + 1}</th>
                      <td>{app.universityName}</td>
                      <td>
                        <span className="badge badge-primary">{app.scholarshipCategory}</span>
                      </td>
                      <td>${app.applicationFees}</td>
                      <td>
                        <span className={`badge ${
                          app.applicationStatus === 'completed' ? 'badge-success' :
                          app.applicationStatus === 'processing' ? 'badge-warning' :
                          app.applicationStatus === 'rejected' ? 'badge-error' :
                          'badge-info'
                        }`}>
                          {app.applicationStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          app.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'
                        }`}>
                          {app.paymentStatus}
                        </span>
                      </td>
                      <td>{app.feedback || 'No feedback yet'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
