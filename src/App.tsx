import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Error from './pages/Error';
import Register from './components/register';
import Admin from './pages/Admin';
import Loginuser from './pages/login';
import User from './pages/User';
import BookForm from './features/bookform';
import UpdateProfile from './components/userprofile'
// import StripeCheckoutForm from './features/stripeform';
// import other components as needed

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Loginuser />,
      errorElement: <Error />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: 'admin',
      element: <Admin />,
      errorElement: <Error />,
    },
    {
      path: 'user',
      element: <User />,
      errorElement: <Error />,
    },
    {
      path: 'user/bookform',
      element: <BookForm />,
      errorElement: <Error />,
    },
    {
      path: 'booking-cancelled',
      element: <Register />,
      errorElement: <Error />,
    },

    {
      path:'/update-profile',
      element: <UpdateProfile/>,
    }
    // Add additional routes if needed
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
    </>
  );
};

export default App;
