import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Book, Mail, Ticket, User, Car } from 'lucide-react';
import axios from 'axios';
import { FaSun, FaMoon } from 'react-icons/fa';
import VehicleList from '../features/vehicle';
import BookingManagementComponent from './userbookings';
// import TicketManagementComponent from './usertickets'

// Types for user and role
interface User {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  role: 'user' | 'admin'; // Example roles
}

const UserSidebar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const getToken = (): string | null => {
    return localStorage.getItem('authToken');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      localStorage.removeItem('authToken');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setUser(response.data);
      setEditedUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    }
  };

  const handleSaveProfile = async () => {
    if (editedUser) {
      try {
        await axios.put(`/api/user/${editedUser.id}`, editedUser, {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        });
        setUser(editedUser);
        setIsEditing(false);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  useEffect(() => {
    fetchUserData();
  },);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className={`w-64 hover:w-80 transition-width duration-300 ease-in-out shadow-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} flex-none`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex-grow overflow-y-auto">
            <div className="flex flex-col items-center mb-6">
              {user && (
                <>
                  <img
                    className="w-24 h-24 rounded-full mb-4"
                    src={user.imageUrl}
                    alt="User"
                  />
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500">{user.email}</p>
                </>
              )}
            </div>
            <nav className="space-y-2">
              {user && (
                <>
                  <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
                    <Home className="mr-2" />
                    Home
                  </Link>
                  <Link to="#carlist" className="flex items-center p-2 hover:bg-gray-700 rounded">
                    <Book className="mr-2" />
                    Bookings
                  </Link>
                  <Link to="#messages" className="flex items-center p-2 hover:bg-gray-700 rounded">
                    <Mail className="mr-2" />
                    Messages
                  </Link>
                  <Link to="#tickets" className="flex items-center p-2 hover:bg-gray-700 rounded">
                    <Ticket className="mr-2" />
                    Tickets
                  </Link>
                  <Link to="#profile" onClick={() => setIsEditing(true)} className="flex items-center p-2 hover:bg-gray-700 rounded">
                    <User className="mr-2" />
                    Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="flex items-center p-2 hover:bg-gray-700 rounded">
                      <Car className="mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-2 hover:bg-gray-700 rounded"
                  >
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
          <div className="p-6 border-t border-gray-700 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Toggle {darkMode ? 'Light' : 'Dark'} Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`ml-2 rounded-full p-2 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-yellow-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-6 grid grid-cols-1 gap-4 overflow-y-auto">
        <div id="carlist" className="bg-gray-100 p-4 rounded shadow">
           <VehicleList/>
        </div>
        <div id="bookings" className="bg-gray-100 p-4 rounded shadow">
          <BookingManagementComponent/>
        </div>
        <div id="tickets" className="bg-gray-100 p-4 rounded shadow">
          {/* <TicketManagementComponent/> */}
        </div>
        <div id="profile" className="bg-gray-100 p-4 rounded shadow">
          {/* Profile Edit Form or Profile Component */}
        </div>
      </div>
      {isEditing && editedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  title='Name'
                  className="w-full p-2 border rounded"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  title='email'
                  className="w-full p-2 border rounded"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                  type="text"
                  title='imageUrl'
                  className="w-full p-2 border rounded"
                  value={editedUser.imageUrl}
                  onChange={(e) => setEditedUser({ ...editedUser, imageUrl: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white p-2 rounded"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
