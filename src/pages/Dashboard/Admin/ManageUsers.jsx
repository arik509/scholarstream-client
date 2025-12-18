import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get('/api/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email, newRole) => {
    try {
      await axiosInstance.patch(`/api/users/${email}/role`, { role: newRole });
      setUsers(users.map(user => 
        user.email === email ? { ...user, role: newRole } : user
      ));
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (email) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await axiosInstance.delete(`/api/users/${email}`);
      setUsers(users.filter(user => user.email !== email));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = filterRole === 'All' 
    ? users 
    : users.filter(user => user.role === filterRole);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Filter by Role:</span>
              </label>
              <select 
                className="select select-bordered"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Moderator">Moderator</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Users: <span className="font-bold text-primary">{filteredUsers.length}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Info</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Change Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full">
                            <img src={user.photoURL || 'https://via.placeholder.com/150'} alt={user.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${
                        user.role === 'Admin' ? 'badge-error' : 
                        user.role === 'Moderator' ? 'badge-warning' : 
                        'badge-info'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="select select-bordered select-sm"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.email, e.target.value)}
                      >
                        <option value="Student">Student</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteUser(user.email)}
                        className="btn btn-error btn-sm"
                      >
                        Delete
                      </button>
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

export default ManageUsers;
