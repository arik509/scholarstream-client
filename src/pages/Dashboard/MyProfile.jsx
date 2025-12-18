import { useAuth } from '../../contexts/AuthContext';

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="card bg-base-100 shadow-xl max-w-2xl">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-2">
                <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt={user?.displayName} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.displayName}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <span className={`badge mt-2 ${
                user?.role === 'Admin' ? 'badge-error' : 
                user?.role === 'Moderator' ? 'badge-warning' : 
                'badge-info'
              }`}>
                {user?.role || 'Student'}
              </span>
            </div>
          </div>

          <div className="divider"></div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold text-lg">{user?.displayName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-semibold text-lg">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Role</p>
              <p className="font-semibold text-lg">{user?.role || 'Student'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
