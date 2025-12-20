import { useState, useEffect } from 'react';
import axiosInstance from '../../../config/api';
import Swal from 'sweetalert2';
import { FaTrash, FaUserShield, FaFilter } from 'react-icons/fa';

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
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load users',
        icon: 'error',
        confirmButtonColor: '#8b5cf6'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (email, newRole, userName) => {
    const result = await Swal.fire({
      title: 'Change User Role?',
      html: `Change <strong>${userName}</strong>'s role to <strong>${newRole}</strong>?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.patch(`/api/users/${email}/role`, { role: newRole });
        setUsers(users.map(user => 
          user.email === email ? { ...user, role: newRole } : user
        ));
        
        Swal.fire({
          title: 'Updated!',
          text: `User role has been changed to ${newRole}`,
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error updating role:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update user role. Please try again.',
          icon: 'error',
          confirmButtonColor: '#8b5cf6'
        });
      }
    } else {
      fetchUsers();
    }
  };

  const handleDeleteUser = async (email, userName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete user <strong>${userName}</strong>. This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete user!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/users/${email}`);
        setUsers(users.filter(user => user.email !== email));
        
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted successfully',
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete user. Please try again.',
          icon: 'error',
          confirmButtonColor: '#8b5cf6'
        });
      }
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
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaFilter className="text-primary" />
                  Filter by Role:
                </span>
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
                      <span className={`badge gap-1 ${
                        user.role === 'Admin' ? 'badge-error' : 
                        user.role === 'Moderator' ? 'badge-warning' : 
                        'badge-info'
                      }`}>
                        <FaUserShield className="text-xs" />
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="select select-bordered select-sm"
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.email, e.target.value, user.name)}
                      >
                        <option value="Student">Student</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDeleteUser(user.email, user.name)}
                        className="btn btn-error btn-sm gap-1"
                      >
                        <FaTrash />
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
