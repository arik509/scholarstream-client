import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';
import Swal from 'sweetalert2';
import { FaCommentDots, FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa';
import { MdFeedback } from 'react-icons/md';

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
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load applications',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus, userName) => {
    const statusIcons = {
      pending: 'question',
      processing: 'info',
      completed: 'success',
      rejected: 'warning'
    };

    const result = await Swal.fire({
      title: 'Change Application Status?',
      html: `Change <strong>${userName}</strong>'s application status to <strong>${newStatus}</strong>?`,
      icon: statusIcons[newStatus],
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/api/applications/${id}/status`, { 
          applicationStatus: newStatus 
        });
        setApplications(applications.map(app => 
          app._id === id ? { ...app, applicationStatus: newStatus } : app
        ));
        
        Swal.fire({
          title: 'Updated!',
          text: `Application status changed to ${newStatus}`,
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error updating status:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update status. Please try again.',
          icon: 'error',
          confirmButtonColor: '#8b5cf6'
        });
      }
    } else {
      fetchApplications();
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!selectedApp || !feedback.trim()) {
      Swal.fire({
        title: 'Missing Feedback!',
        text: 'Please write feedback before submitting',
        icon: 'warning',
        confirmButtonColor: '#8b5cf6'
      });
      return;
    }

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
      
      Swal.fire({
        title: 'Success!',
        text: 'Feedback has been added successfully',
        icon: 'success',
        confirmButtonColor: '#8b5cf6',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error adding feedback:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add feedback. Please try again.',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    }
  };

  const openFeedbackModal = (app) => {
    setSelectedApp(app);
    setFeedback(app.feedback || '');
    document.getElementById('feedback_modal').showModal();
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FaCheckCircle className="inline mr-1" />;
      case 'rejected': return <FaTimesCircle className="inline mr-1" />;
      case 'processing': return <FaSpinner className="inline mr-1" />;
      default: return <FaClock className="inline mr-1" />;
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
      <div className="flex items-center gap-3 mb-6">
        <MdFeedback className="text-4xl text-primary" />
        <h1 className="text-3xl font-bold text-gray-800">Manage Applications</h1>
        <span className="badge badge-primary badge-lg">{applications.length}</span>
      </div>

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
                        onChange={(e) => handleStatusChange(app._id, e.target.value, app.userName)}
                      >
                        <option value="pending">
                          {getStatusIcon('pending')} Pending
                        </option>
                        <option value="processing">
                          {getStatusIcon('processing')} Processing
                        </option>
                        <option value="completed">
                          {getStatusIcon('completed')} Completed
                        </option>
                        <option value="rejected">
                          {getStatusIcon('rejected')} Rejected
                        </option>
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
                      <button 
                        onClick={() => openFeedbackModal(app)}
                        className="btn btn-info btn-sm gap-1"
                      >
                        <FaCommentDots />
                        {app.feedback ? 'Edit Feedback' : 'Add Feedback'}
                      </button>
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
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MdFeedback className="text-primary" />
            Add Feedback
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Feedback for <span className="text-primary">{selectedApp?.userName}</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-action">
            <button onClick={handleFeedbackSubmit} className="btn btn-primary gap-2">
              <FaCheckCircle />
              Submit Feedback
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
