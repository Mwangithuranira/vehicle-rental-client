import React, { useState, useEffect } from 'react';
import axiosInstance from '../instance';  // Adjust the import path based on your file structure

// Define User type
type User = {
  id: number;
  full_name: string;
  phone_number: string;
  role: string;
  address: string;
  email: string;
  image_url?: string;  // Optional field
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
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      // Ensure the data matches the expected type
      const fetchedUsers: User[] = response.data;
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  // Create or update user
  const handleCreateOrUpdate = async () => {
    try {
      if (!newUser.full_name || !newUser.email || !newUser.address || !newUser.phone_number || !newUser.role) {
        alert('Please fill in all required fields');
        return;
      }

      const payload = {
        full_name: newUser.full_name,
        email: newUser.email,
        address: newUser.address,
        phone_number: newUser.phone_number,
        image_url: newUser.image_url || 'https://randomuser.me/api/portraits/men/1.jpg',  // Default image if not provided
        role: newUser.role,
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
      });
      setShowAddForm(false);
      setEditMode(false);
      setCurrentUserId(null);
    } catch (error) {
      console.error('Error creating/updating user', error);
    }
  };

  // Handle input changes for form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare for user editing
  const handleEdit = (user: User) => {
    setNewUser(user);
    setEditMode(true);
    setShowAddForm(true);
    setCurrentUserId(user.id);
  };

  // Handle user deletion
  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  // Filter users based on search query
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
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Image URL</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="p-3 border-b">{user.id}</td>
                <td className="p-3 border-b">{user.full_name}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{user.address}</td>
                <td className="p-3 border-b">{user.phone_number}</td>
                <td className="p-3 border-b">{user.role}</td>
                <td className="p-3 border-b">
                  <img src={user.image_url || 'https://randomuser.me/api/portraits/men/1.jpg'} alt={user.full_name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3 border-b">
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 transition mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition"
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
