import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface EditCarFormProps {
  carId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditCarForm: React.FC<EditCarFormProps> = ({ carId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`/api/vehicles/${carId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/vehicles/${carId}`, formData);
      console.log('Updated Vehicle:', response.data);
      onSuccess();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      // Handle error state or display error message
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-4">
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">
            Make
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>

        <div className="flex justify-between">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarForm;
