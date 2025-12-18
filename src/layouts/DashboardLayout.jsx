import { Outlet, NavLink, Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  const studentLinks = [
    { path: '/dashboard', label: 'My Profile', icon: '👤', end: true },
    { path: '/dashboard/my-applications', label: 'My Applications', icon: '📝' },
    { path: '/dashboard/my-reviews', label: 'My Reviews', icon: '⭐' }
  ];

  const moderatorLinks = [
    { path: '/dashboard', label: 'My Profile', icon: '👤', end: true },
    { path: '/dashboard/manage-applications', label: 'Manage Applications', icon: '📋' },
    { path: '/dashboard/all-reviews', label: 'All Reviews', icon: '💬' }
  ];

  const adminLinks = [
    { path: '/dashboard', label: 'My Profile', icon: '👤', end: true },
    { path: '/dashboard/add-scholarship', label: 'Add Scholarship', icon: '➕' },
    { path: '/dashboard/manage-scholarships', label: 'Manage Scholarships', icon: '📚' },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: '👥' },
    { path: '/dashboard/analytics', label: 'Analytics', icon: '📊' }
  ];

  let links = studentLinks;
  if (user?.role === 'Moderator') {
    links = moderatorLinks;
  } else if (user?.role === 'Admin') {
    links = adminLinks;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col bg-base-200">
        <div className="navbar bg-base-100 lg:hidden shadow-md">
          <div className="flex-none">
            <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold text-primary">Dashboard</span>
          </div>
        </div>
        
        <div className="p-4 lg:p-8 min-h-screen">
          <Outlet />
        </div>
      </div>
      
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="menu p-4 w-72 min-h-full bg-base-100 text-base-content">
          <div className="mb-8 px-4">
            <Link to="/" className="text-2xl font-bold text-primary">ScholarStream</Link>
            <p className="text-sm text-gray-500 mt-1">{user?.role || 'Student'} Dashboard</p>
          </div>
          
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive ? 'bg-primary text-white' : 'hover:bg-base-200'
                    }`
                  }
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="divider"></div>

          <ul>
            <li>
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200">
                <span className="text-xl">🏠</span>
                <span className="font-medium">Back to Home</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
