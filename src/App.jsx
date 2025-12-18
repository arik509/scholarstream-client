import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllScholarships from './pages/AllScholarships';
import PrivateRoute from './routes/PrivateRoute';
import ManageUsers from './pages/Dashboard/Admin/ManageUsers';
import MyProfile from './pages/Dashboard/MyProfile';


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
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "scholarships",
        element: <AllScholarships />
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
        element: <MyProfile></MyProfile>
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers></ManageUsers>
      }
    ]
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
