import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  full_name: string;
  email: string;
  imageUrl: string;
  role: 'user' | 'admin'; // Example roles
}

const UpdateProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`/api/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          setUser(response.data);
          setEditedUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setEditedUser({ ...editedUser!, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleSaveProfile = async () => {
    if (editedUser) {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          await axios.put(`https://car-rental-dtbfg2hfd7abagfu.eastus-01.azurewebsites.net/api/user/${userId}`, editedUser, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
          setUser(editedUser);
          navigate('/'); // Navigate to home or another page after saving
        }
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  return user && editedUser ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={imagePreview?.toString() || user.imageUrl}
            alt="Profile"
          />
          <input type="file" title='file' onChange={handleImageChange} className="mb-4" />
        </div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          title='name'
          value={editedUser.full_name}
          onChange={(e) => setEditedUser({ ...editedUser, full_name: e.target.value })}
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          title='email'
          value={editedUser.email}
          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          className="border border-gray-300 p-2 mb-4 w-full"
        />
        <button
          onClick={handleSaveProfile}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default UpdateProfile;
