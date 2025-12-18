import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (user && (user.role === 'Moderator' || user.role === 'Admin')) {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

export default ModeratorRoute;
