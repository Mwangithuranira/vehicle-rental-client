import React, { useState, useEffect } from 'react';
import axiosInstance from '../instance'; // Adjust the import path if needed

interface VehicleSpecification {
  manufacturer: string;
  model: string;
  image: string;
  year: string; // Ensure 'year' is a string
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
  price: number;
}

interface Vehicle {
  id?: number;
  rental_rate: string;
  availability: boolean;
  vehicleSpecification: VehicleSpecification;
}

const ManageVehiclesComponent: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newVehicle, setNewVehicle] = useState<Vehicle>({
    rental_rate: '',
    availability: true,
    vehicleSpecification: {
      manufacturer: '',
      model: '',
      image: '',
      year: '', // Ensure this is a string
      fuel_type: '',
      engine_capacity: '',
      transmission: '',
      seating_capacity: 0,
      color: '',
      features: '',
      price: 0,
    },
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editVehicleId, setEditVehicleId] = useState<number | null>(null);

  // Fetch vehicles on component mount
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof VehicleSpecification) => {
    setNewVehicle({
      ...newVehicle,
      vehicleSpecification: {
        ...newVehicle.vehicleSpecification,
        [field]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axiosInstance.put(`/vehicles/${editVehicleId}`, newVehicle);
      } else {
        await axiosInstance.post('/vehicles', newVehicle);
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
      await axiosInstance.delete(`/vehicles/${id}`);
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const resetForm = () => {
    setNewVehicle({
      rental_rate: '',
      availability: true,
      vehicleSpecification: {
        manufacturer: '',
        model: '',
        image: '',
        year: '', // Ensure this is a string
        fuel_type: '',
        engine_capacity: '',
        transmission: '',
        seating_capacity: 0,
        color: '',
        features: '',
        price: 0,
      },
    });
    setEditMode(false);
    setEditVehicleId(null);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const manufacturer = vehicle.vehicleSpecification.manufacturer || '';
    const model = vehicle.vehicleSpecification.model || '';
    const year = (vehicle.vehicleSpecification.year || '').toString(); // Ensure 'year' is a string

    const search = searchQuery.toLowerCase();

    return manufacturer.toLowerCase().includes(search) ||
           model.toLowerCase().includes(search) ||
           year.toLowerCase().includes(search);
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{editMode ? 'Edit Vehicle' : 'Add Vehicle'}</h2>

      {/* Display form only when adding or editing */}
      {(editMode || !editMode) && (
        <form onSubmit={handleSubmit} className="mb-4 bg-white text-black p-6 rounded shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Form fields for vehicle specifications */}
            {Object.entries(newVehicle.vehicleSpecification).map(([key, value]) => (
              <div key={key} className="mb-4 relative">
                <label htmlFor={key} className="block mb-2 font-semibold">{key.replace(/_/g, ' ').toUpperCase()}</label>
                <input
                  type={typeof value === 'number' ? 'number' : 'text'}
                  name={key}
                  id={key}
                  value={value}
                  onChange={(e) => handleInputChange(e, key as keyof VehicleSpecification)}
                  className="w-full p-3 border bg-white text-black rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
                />
              </div>
            ))}
            {/* Additional fields for rental rate and availability */}
            <div className="mb-4 relative">
              <label htmlFor="rental_rate" className="block mb-2 font-semibold">Rental Rate</label>
              <input
                type="text"
                name="rental_rate"
                id="rental_rate"
                value={newVehicle.rental_rate}
                onChange={(e) => setNewVehicle({ ...newVehicle, rental_rate: e.target.value })}
                className="w-full p-3 border bg-white text-black rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="availability" className="block mb-2 font-semibold">Availability</label>
              <select
                name="availability"
                id="availability"
                value={newVehicle.availability ? 'true' : 'false'}
                onChange={(e) => setNewVehicle({ ...newVehicle, availability: e.target.value === 'true' })}
                className="w-full p-3 border bg-white text-black rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors duration-300"
            >
              {editMode ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by manufacturer or model"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border bg-white text-black rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200">
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
              <tr key={vehicle.id} className="hover:bg-gray-100 transition-colors duration-300">
                <td className="border p-2">{vehicle.id}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.manufacturer}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.model}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.year}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.fuel_type}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.engine_capacity}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.transmission}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.seating_capacity}</td>
                <td className="border p-2">{vehicle.vehicleSpecification.color}</td>
                <td className="border p-2">
                  <img src={vehicle.vehicleSpecification.image} alt={`${vehicle.vehicleSpecification.manufacturer} ${vehicle.vehicleSpecification.model}`} className="w-24 h-16 object-cover" />
                </td>
                <td className="border p-2">{vehicle.rental_rate}</td>
                <td className="border p-2">{vehicle.availability ? 'Available' : 'Unavailable'}</td>
                <td className="border p-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(vehicle.id!)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300"
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

export default ManageVehiclesComponent;
