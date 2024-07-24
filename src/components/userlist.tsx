import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type User = {
  id: number;
  full_name: string;
  phone_number: string;
  role: string;
  address: string;
  email: string;
  image_url: string; // Ensure this is a valid image URL
  bookings: Booking[];
  customerSupportTickets: SupportTicket[];
  password?: string;
};

type Booking = {
  id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
};

type SupportTicket = {
  id: number;
  ticket_subject: string;
  ticket_description: string;
  ticket_status: string;
};

const UserManagementComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    full_name: '',
    email: '',
    address: '',
    phone_number: '',
    image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
    role: '',
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const payload = {
        full_name: newUser.full_name,
        email: newUser.email,
        address: newUser.address,
        phone_number: newUser.phone_number,
        image_url: newUser.image_url,
        role: newUser.role,
        password: newUser.password,
      };

      if (editMode && currentUserId !== null) {
        await axiosInstance.put(`/users/${currentUserId}`, payload);
      } else {
        await axiosInstance.post('/users', payload);
      }

      fetchUsers();
      setNewUser({
        full_name: '',
        email: '',
        address: '',
        phone_number: '',
        image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
        role: '',
        password: '',
      });
      setShowAddForm(false);
      setEditMode(false);
      setCurrentUserId(null);
    } catch (error) {
      console.error('Error creating/updating user', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user: User) => {
    setNewUser(user);
    setEditMode(true);
    setShowAddForm(true);
    setCurrentUserId(user.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = user.full_name || '';
    const address = user.address || '';
    const search = searchQuery.toLowerCase();

    return fullName.toLowerCase().includes(search) ||
      address.toLowerCase().includes(search);
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 bg-blue-700 p-4 rounded-lg text-white shadow-md">User Management</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by user name or address"
          className="p-2 border rounded-lg w-full max-w-md shadow-sm bg-white text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-4 bg-green-600 text-white p-2 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => {
            setShowAddForm(true);
            setEditMode(false);
            setCurrentUserId(null);
            setNewUser({
              full_name: '',
              email: '',
              address: '',
              phone_number: '',
              image_url: 'https://randomuser.me/api/portraits/men/1.jpg',
              role: '',
              password: '',
            });
          }}
        >
          {editMode ? 'Edit User' : 'Add User'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit User' : 'Add New User'}</h2>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.full_name || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.email || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.address || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.phone_number || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="image_url"
            placeholder="Image URL"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.image_url || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.role || ''}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newUser.password || ''}
            onChange={handleInputChange}
          />
          <div className="flex gap-4 mt-4">
            <button
              className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={handleCreateOrUpdate}
            >
              {editMode ? 'Update User' : 'Create User'}
            </button>
            <button
              className="bg-gray-600 text-white p-2 rounded-lg shadow-md hover:bg-gray-700 transition"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="p-3 text-left text-gray-700">User ID</th>
              <th className="p-3 text-left text-gray-700">Image</th>
              <th className="p-3 text-left text-gray-700">Full Name</th>
              <th className="p-3 text-left text-gray-700">Email</th>
              <th className="p-3 text-left text-gray-700">Phone Number</th>
              <th className="p-3 text-left text-gray-700">Role</th>
              <th className="p-3 text-left text-gray-700">Address</th>
              <th className="p-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-300">
                <td className="p-3 text-gray-700">{user.id}</td>
                <td className="p-3">
                  <img src={user.image_url} alt={user.full_name} className="w-12 h-12 rounded-full object-cover" />
                </td>
                <td className="p-3 text-gray-700">{user.full_name}</td>
                <td className="p-3 text-gray-700">{user.email}</td>
                <td className="p-3 text-gray-700">{user.phone_number}</td>
                <td className="p-3 text-gray-700">{user.role}</td>
                <td className="p-3 text-gray-700">{user.address}</td>
                <td className="p-3 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementComponent;
