import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstance.get('/api/applications');
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.patch(`/api/applications/${id}/status`, { 
        applicationStatus: newStatus 
      });
      setApplications(applications.map(app => 
        app._id === id ? { ...app, applicationStatus: newStatus } : app
      ));
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedApp || !feedback.trim()) return;

    try {
      await axiosInstance.patch(`/api/applications/${selectedApp._id}/feedback`, { 
        feedback 
      });
      setApplications(applications.map(app => 
        app._id === selectedApp._id ? { ...app, feedback } : app
      ));
      setSelectedApp(null);
      setFeedback('');
      document.getElementById('feedback_modal').close();
      alert('Feedback added successfully!');
    } catch (error) {
      console.error('Error adding feedback:', error);
      alert('Failed to add feedback');
    }
  };

  const openFeedbackModal = (app) => {
    setSelectedApp(app);
    setFeedback(app.feedback || '');
    document.getElementById('feedback_modal').showModal();
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Applications</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applicant</th>
                  <th>University</th>
                  <th>Degree</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="font-bold">{app.userName}</div>
                      <div className="text-sm text-gray-500">{app.userEmail}</div>
                    </td>
                    <td>{app.universityName}</td>
                    <td>{app.degree}</td>
                    <td>
                      <select 
                        className="select select-bordered select-sm"
                        value={app.applicationStatus}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <span className={`badge ${
                        app.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'
                      }`}>
                        {app.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openFeedbackModal(app)}
                          className="btn btn-info btn-sm"
                        >
                          Feedback
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

      <dialog id="feedback_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add Feedback</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Feedback for {selectedApp?.userName}</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button onClick={handleFeedbackSubmit} className="btn btn-primary">
              Submit
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplications;
