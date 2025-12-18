import { createBrowserRouter, RouterProvider } from 'react-router';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
