import React, { useEffect, useState } from 'react';
import axiosInstance from '../instance'; // Import your axios instance
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setLoading } from './vehicleslice';
import { Link } from 'react-router-dom';
import { Users, Workflow, ShipWheel, Fuel } from 'lucide-react';

// Define types for vehicle data
interface VehicleSpecification {
  image: string;
  model: string;
  seating_capacity: number;
  transmission: string;
  features: string;
  fuel_type: string;
  price: string;
}

interface Vehicle {
  id: string;
  vehicleSpecification: VehicleSpecification;
}

const VehicleList: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.vehicles.loading);
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vehicles?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil((vehicles?.length || 0) / itemsPerPage))
    );
  const prevPage = () =>
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get('/vehicles');
        setVehicles(response.data);
        dispatch(setLoading(false));
      } catch (err) {
        setError('Error loading vehicles');
        dispatch(setLoading(false));
      }
    };
    fetchVehicles();
  }, [dispatch]);

  if (loading)
    return <div className="text-center text-lg mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-lg text-red-600 mt-10">
        Error loading vehicles
      </div>
    );

  const handleRentNow = (vehicleId: string, price: string) => {
    localStorage.setItem('selectedVehicleId', vehicleId);
    localStorage.setItem('selectedPrice', price);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
        Book Your Favourite Car at Affordable Prices from Our <br />
        KENYA BEST COLLECTION
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems?.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={vehicle.vehicleSpecification.image}
              alt={vehicle.vehicleSpecification.model}
              className="w-full h-48 object-cover rounded-t-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {vehicle.vehicleSpecification.model}
            </h2>
            <div className="mb-4">
              <div className="flex flex-col space-y-2 text-gray-700">
                <div className="flex items-center">
                  <Users className="mr-2 text-blue-500" />
                  {vehicle.vehicleSpecification.seating_capacity} passengers
                </div>
                <div className="flex items-center">
                  <Workflow className="mr-2 text-blue-500" />
                  {vehicle.vehicleSpecification.transmission}
                </div>
                <div className="flex items-center">
                  <ShipWheel className="mr-2 text-blue-500" />
                  {vehicle.vehicleSpecification.features}
                </div>
                <div className="flex items-center">
                  <Fuel className="mr-2 text-blue-500" />
                  {vehicle.vehicleSpecification.fuel_type}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Price</p>
                <p className="text-xl font-bold text-gray-900">
                  ${vehicle.vehicleSpecification.price}
                  <span className="text-sm font-medium text-gray-600">/day</span>
                </p>
              </div>
              <Link to="bookform">
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  onClick={() => handleRentNow(vehicle.id, vehicle.vehicleSpecification.price)}
                >
                  Rent Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={vehicles?.length || 0}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

const Pagination: React.FC<{
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
}> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <nav>
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={prevPage}
              className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white transition duration-300"
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={`py-2 px-4 rounded-lg ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-blue-700 hover:text-white transition duration-300`}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={nextPage}
              className="py-2 px-4 rounded-lg bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white transition duration-300"
              disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VehicleList;
