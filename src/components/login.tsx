import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/auth/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { token } = response.data; // Extract the token object from the response
      const role = token.user[5]; // Get the role from the 5th element of the user array

      // Store token and role in localStorage
      localStorage.setItem('authToken', token.token);
      localStorage.setItem('userId', token.user[0]);
      localStorage.setItem('userRole', role);
      console.log('Login success:', token.user);

      if (role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else if (role === 'user') {
        navigate('/user'); // Redirect to user dashboard
      } else {
        setError('Unknown role. Please contact support.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', error); // Debugging: Check the error
    }
  };

  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center bg-[url('https://www.revv.co.in/blogs/wp-content/uploads/2020/09/Car-Rentals-in-India.jpg')] text-white">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-6 max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg backdrop-blur-md mx-4 my-8 text-black bg-clip-padding">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Welcome Back To KeBest</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              title="Email"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              title="Password"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
          <button
            type="submit"
            title="Login"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              New here?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
            <p className="text-gray-700 text-sm mt-2">
              Forgot your password?{' '}
              <button
                onClick={() => navigate('/reset-password')}
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </button>
            </p>
          </div>
        </form>
      </div>
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 text-white hover:text-gray-400"
      >
        &lt; Home
      </button>
    </div>
  );
};

export default Login;
