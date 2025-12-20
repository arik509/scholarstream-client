import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllScholarships from './pages/AllScholarships';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import ModeratorRoute from './routes/ModeratorRoute';
import MyProfile from './pages/Dashboard/MyProfile';
import AddScholarship from './pages/Dashboard/Admin/AddScholarship';
import ManageScholarships from './pages/Dashboard/Admin/ManageScholarships';
import ManageUsers from './pages/Dashboard/Admin/ManageUsers';
import Analytics from './pages/Dashboard/Admin/Analytics';
import MyApplications from './pages/Dashboard/Student/MyApplications';
import MyReviews from './pages/Dashboard/Student/MyReviews';
import ManageApplications from './pages/Dashboard/Moderator/ManageApplications';
import AllReviews from './pages/Dashboard/Moderator/AllReviews';
import ScholarshipDetails from './pages/ScholarshipDetails';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/scholarships",
        element: <AllScholarships />
      },
      {
        path: "/scholarships/:id",
        element: <ScholarshipDetails></ScholarshipDetails>
      },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        )
      },
      {
        path: "/payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        )
      },
      {
        path: "/payment-failed",
        element: (
          <PrivateRoute>
            <PaymentFailed></PaymentFailed>
          </PrivateRoute>
        )
      }   
    ]
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MyProfile />
      },
      {
        path: "/dashboard/my-applications",
        element: <MyApplications />
      },
      {
        path: "/dashboard/my-reviews",
        element: <MyReviews />
      },
      {
        path: "/dashboard/manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        )
      },
      {
        path: "/dashboard/all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        )
      },
      {
        path: "/dashboard/add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        )
      },
      {
        path: "/dashboard/analytics",
        element: (
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        )
      }   
    ]
  },
  {
    path: "*",
    element: <NotFound></NotFound>
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
