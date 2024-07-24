import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '' // URL or empty string
  });

  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, image: '' });
    }
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const data = {
        full_name: formData.fullName,
        address: formData.address,
        phone_number: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        role: 'user', // Default role
        image_url: formData.image || 'https://randomuser.me/api/portraits/men/1.jpg' // Default image URL
      };

      const response = await axios.post('https://car-rental-dtbfg2hfd7abagfu.eastus-01.azurewebsites.net/auth/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });  // Register the user

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Registration error:', error.response?.data);
        setError('Registration failed. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center bg-[url('https://www.revv.co.in/blogs/wp-content/uploads/2020/09/Car-Rentals-in-India.jpg')] text-white">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 p-6 max-w-md w-full bg-white bg-opacity-90 shadow-lg rounded-lg backdrop-blur-md mx-4 my-8 text-black bg-clip-padding">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Welcome To Kebest Register Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              id="file-upload"
              title="Profile Picture"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full overflow-hidden shadow-md border-2 border-gray-300 hover:border-blue-500 transition duration-300 ease-in-out"
            >
              {formData.image ? (
                <img
                  src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Default Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </label>
            
          </div>
          click on the picture to upload own profile picture
          <div>
            <label className="block text-gray-700 text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              title="Full Name"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              title="Address"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              title="Phone Number"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
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
          </div>
          <div>
            <label className="block text-gray-700 text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              title="Confirm Password"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>
          <button
            type="submit"
            title="Register"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-700 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline"
              >
                Login
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

export default Register;
