
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

interface Vehicle {
  id?: number;
  rental_rate: string;
  availability: boolean;
  manufacturer: string;
  model: string;
  image: string;
  year: string;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  price: number;
  policy_number: string;
  provider: string;
  coverage: string;
  start_date: string;
  end_date: string;
  acquisition_date: string;
  depreciation_rate: number;
  current_value: number;
  maintenance_cost: number;
  status: string;
}

const ManageVehiclesComponent: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    rental_rate: '',
    availability: true,
    manufacturer: '',
    model: '',
    image: '',
    year: '',
    fuel_type: '',
    engine_capacity: '',
    transmission: '',
    seating_capacity: 0,
    color: '',
    features: '',
    price: 0,
    policy_number: '',
    provider: '',
    coverage: '',
    start_date: '',
    end_date: '',
    acquisition_date: '',
    depreciation_rate: 0,
    current_value: 0,
    maintenance_cost: 0,
    status: 'Available',
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editVehicleId, setEditVehicleId] = useState<number | null>(null);



  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axiosInstance.get('/vehicles');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error fetching vehicles', error);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Vehicle) => {
    setNewVehicle({
      ...newVehicle,
      [field]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:8000/api/vehicles/${editVehicleId}`, newVehicle, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token retrieval as needed
            'Content-Type': 'application/json',
          },
        });
      } else {
        await axios.post('http://localhost:8000/api/vehicles', newVehicle, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token retrieval as needed
            'Content-Type': 'application/json',
          },
        });
      }
      fetchVehicles();
      resetForm();
    } catch (error) {
      console.error('Error submitting vehicle data:', error);
    }
  };

  const handleEdit = (id: number) => {
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle) {
      setNewVehicle(vehicle);
      setEditMode(true);
      setEditVehicleId(id);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token retrieval as needed
        },
      });
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const resetForm = () => {
    setNewVehicle({
      rental_rate: '',
      availability: true,
      manufacturer: '',
      model: '',
      image: '',
      year: '',
      fuel_type: '',
      engine_capacity: '',
      transmission: '',
      seating_capacity: 0,
      color: '',
      features: '',
      price: 0,
      policy_number: '',
      provider: '',
      coverage: '',
      start_date: '',
      end_date: '',
      acquisition_date: '',
      depreciation_rate: 0,
      current_value: 0,
      maintenance_cost: 0,
      status: 'Available',
    });
    setEditMode(false);
    setEditVehicleId(null);
  };




  const filteredVehicles =vehicles.filter((vehicle) => {
    const manufacturer= vehicle.manufacturer|| '';
    const model = vehicle.model || '';
    const year = vehicle.year || '';
    const search = searchQuery.toLowerCase();

    return manufacturer.toLowerCase().includes(search) || model.toLowerCase().includes(search) || year.toLowerCase().includes(search);
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="manufacturer" className="block mb-2 font-semibold">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              id="manufacturer"
              value={newVehicle.manufacturer}
              onChange={(e) => handleInputChange(e, 'manufacturer')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="model" className="block mb-2 font-semibold">Model</label>
            <input
              type="text"
              name="model"
              id="model"
              value={newVehicle.model}
              onChange={(e) => handleInputChange(e, 'model')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="year" className="block mb-2 font-semibold">Year</label>
            <input
              type="text"
              name="year"
              id="year"
              value={newVehicle.year}
              onChange={(e) => handleInputChange(e, 'year')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="fuel_type" className="block mb-2 font-semibold">Fuel Type</label>
            <input
              type="text"
              name="fuel_type"
              id="fuel_type"
              value={newVehicle.fuel_type}
              onChange={(e) => handleInputChange(e, 'fuel_type')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="engine_capacity" className="block mb-2 font-semibold">Engine Capacity</label>
            <input
              type="text"
              name="engine_capacity"
              id="engine_capacity"
              value={newVehicle.engine_capacity}
              onChange={(e) => handleInputChange(e, 'engine_capacity')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="transmission" className="block mb-2 font-semibold">Transmission</label>
            <input
              type="text"
              name="transmission"
              id="transmission"
              value={newVehicle.transmission}
              onChange={(e) => handleInputChange(e, 'transmission')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="seating_capacity" className="block mb-2 font-semibold">Seating Capacity</label>
            <input
              type="number"
              name="seating_capacity"
              id="seating_capacity"
              value={newVehicle.seating_capacity}
              onChange={(e) => handleInputChange(e, 'seating_capacity')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="color" className="block mb-2 font-semibold">Color</label>
            <input
              type="text"
              name="color"
              id="color"
              value={newVehicle.color}
              onChange={(e) => handleInputChange(e, 'color')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 font-semibold">Image URL</label>
            <input
              type="text"
              name="image"
              id="image"
              value={newVehicle.image}
              onChange={(e) => handleInputChange(e, 'image')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="rental_rate" className="block mb-2 font-semibold">Rental Rate</label>
            <input
              type="text"
              name="rental_rate"
              id="rental_rate"
              value={newVehicle.rental_rate}
              onChange={(e) => handleInputChange(e, 'rental_rate')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="availability" className="block mb-2 font-semibold">Availability</label>
            <select
              name="availability"
              id="availability"
              value={newVehicle.availability ? 'true' : 'false'}
              onChange={(e) => handleInputChange(e, 'availability')}
              className="w-full p-2 border rounded"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
          <div>
            <label htmlFor="features" className="block mb-2 font-semibold">Features</label>
            <input
              type="text"
              name="features"
              id="features"
              value={newVehicle.features}
              onChange={(e) => handleInputChange(e, 'features')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={newVehicle.price}
              onChange={(e) => handleInputChange(e, 'price')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="policy_number" className="block mb-2 font-semibold">Policy Number</label>
            <input
              type="text"
              name="policy_number"
              id="policy_number"
              value={newVehicle.policy_number}
              onChange={(e) => handleInputChange(e, 'policy_number')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="provider" className="block mb-2 font-semibold">Provider</label>
            <input
              type="text"
              name="provider"
              id="provider"
              value={newVehicle.provider}
              onChange={(e) => handleInputChange(e, 'provider')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="coverage" className="block mb-2 font-semibold">Coverage</label>
            <input
              type="text"
              name="coverage"
              id="coverage"
              value={newVehicle.coverage}
              onChange={(e) => handleInputChange(e, 'coverage')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="start_date" className="block mb-2 font-semibold">Start Date</label>
            <input
              type="date"
              name="start_date"
              id="start_date"
              value={newVehicle.start_date}
              onChange={(e) => handleInputChange(e, 'start_date')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="end_date" className="block mb-2 font-semibold">End Date</label>
            <input
              type="date"
              name="end_date"
              id="end_date"
              value={newVehicle.end_date}
              onChange={(e) => handleInputChange(e, 'end_date')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="acquisition_date" className="block mb-2 font-semibold">Acquisition Date</label>
            <input
              type="date"
              name="acquisition_date"
              id="acquisition_date"
              value={newVehicle.acquisition_date}
              onChange={(e) => handleInputChange(e, 'acquisition_date')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="depreciation_rate" className="block mb-2 font-semibold">Depreciation Rate</label>
            <input
              type="number"
              name="depreciation_rate"
              id="depreciation_rate"
              value={newVehicle.depreciation_rate}
              onChange={(e) => handleInputChange(e, 'depreciation_rate')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="current_value" className="block mb-2 font-semibold">Current Value</label>
            <input
              type="number"
              name="current_value"
              id="current_value"
              value={newVehicle.current_value}
              onChange={(e) => handleInputChange(e, 'current_value')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="maintenance_cost" className="block mb-2 font-semibold">Maintenance Cost</label>
            <input
              type="number"
              name="maintenance_cost"
              id="maintenance_cost"
              value={newVehicle.maintenance_cost}
              onChange={(e) => handleInputChange(e, 'maintenance_cost')}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="status" className="block mb-2 font-semibold">Status</label>
            <input
              type="text"
              name="status"
              id="status"
              value={newVehicle.status}
              onChange={(e) => handleInputChange(e, 'status')}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editMode ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </form>

      <div>
        <input
          type="text"
          placeholder="Search by manufacturer or model"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Manufacturer</th>
              <th className="border p-2">Model</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Fuel Type</th>
              <th className="border p-2">Engine Capacity</th>
              <th className="border p-2">Transmission</th>
              <th className="border p-2">Seating Capacity</th>
              <th className="border p-2">Color</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Rental Rate</th>
              <th className="border p-2">Availability</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="border p-2">{vehicle.id}</td>
                <td className="border p-2">{vehicle.manufacturer}</td>
                <td className="border p-2">{vehicle.model}</td>
                <td className="border p-2">{vehicle.year}</td>
                <td className="border p-2">{vehicle.fuel_type}</td>
                <td className="border p-2">{vehicle.engine_capacity}</td>
                <td className="border p-2">{vehicle.transmission}</td>
                <td className="border p-2">{vehicle.seating_capacity}</td>
                <td className="border p-2">{vehicle.color}</td>
                <td className="border p-2">
                  <img src={vehicle.image} alt="Vehicle" className="w-32 h-16 object-cover" />
                </td>
                <td className="border p-2">{vehicle.rental_rate}</td>
                <td className="border p-2">{vehicle.availability ? 'Available' : 'Unavailable'}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(vehicle.id!)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(vehicle.id!)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default ManageVehiclesComponent;
