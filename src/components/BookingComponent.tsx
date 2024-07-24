import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://car-rental-dtbfg2hfd7abagfu.eastus-01.azurewebsites.net/api';

// Default Axios instance with Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ensure Bearer token format
  }
  return config;
});

type Bookings={
   id: number;
  user_id: number,
  vehicle_id: number,
  booking_date: string,
  return_date: string,
  total_amount: number,
  amount: number,
  payment_date: string,
  payment_method: string,
  transaction_id: string,
  location_name: string,
  address: string,
  contact_phone: string,

}
type Booking = {
  id: number;
  user_id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  payments:{
    amount:number;
    payment_status:string;
    payment_date:string;
    payment_method:string;
    transaction_id:string;
  };
  location:{
    location_name:string;
    address:string;
    contact_phone:string;
  }
  amount: number;
  payment_date: string;
  payment_method: string;
  transaction_id: string;
  location_name: string;
  address: string;
  contact_phone: string;
};

const BookingManagementComponent: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<number | null>(null);
  const [newBooking, setNewBooking] = useState({
    user_id: 1,
    vehicle_id: 1,
    booking_date: '',
    return_date: '',
    total_amount: 0,
    amount: 0,
    payment_date: '',
    payment_method: '',
    transaction_id: '',
    location_name: '',
    address: '',
    contact_phone: '',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings', error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      const payload = {
        user_id: Number(newBooking.user_id) || 1,
        vehicle_id: Number(newBooking.vehicle_id) || 1,
        booking_date: newBooking.booking_date || '',
        return_date: newBooking.return_date || '',
        total_amount: Number(newBooking.total_amount) || 0,
        amount: Number(newBooking.amount) || 0,
        payment_date: newBooking.payment_date || '',
        payment_method: newBooking.payment_method || '',
        transaction_id: newBooking.transaction_id || '',
        location_name: newBooking.location_name || '',
        address: newBooking.address || '',
        contact_phone: newBooking.contact_phone || '',
      };
  
      console.log('Sending payload:', payload); // Debugging log
  
      if (editMode && currentBookingId !== null) {
        // PUT request for updating booking by ID
        await axiosInstance.put(`/bookings/${currentBookingId}`, payload);
      } else {
        // POST request for creating booking
        await axiosInstance.post('/bookings', payload);
      }
  
      // Refresh the booking list
      fetchBookings();
  
      // Reset form and state
      setNewBooking({
        user_id: 1,
        vehicle_id: 1,
        booking_date: '',
        return_date: '',
        total_amount: 0,
        amount: 0,
        payment_date: '',
        payment_method: '',
        transaction_id: '',
        location_name: '',
        address: '',
        contact_phone: '',
      });
      setShowAddForm(false);
      setEditMode(false);
      setCurrentBookingId(null);
    } catch (error) {
      console.error('Error creating/updating booking', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error message:', error.message);
        console.error('Axios error response:', error.response?.data);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (booking :Bookings) => {
    setNewBooking(booking);
    setEditMode(true);
    setShowAddForm(true);
    setCurrentBookingId(booking.id); // Set current booking ID for updates
  };

  const handleDelete = async (id: number) => {
    try {
      // DELETE request for deleting booking
      await axiosInstance.delete(`/bookings/${id}`);
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error('Error deleting booking', error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const locationName = booking.location_name || '';  // Default to empty string if undefined
    const address = booking.address || '';     // Default to empty string if undefined
    const search = searchQuery.toLowerCase();

    return locationName.toLowerCase().includes(search) ||
      address.toLowerCase().includes(search);
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 bg-blue-700 p-4 rounded-lg text-white shadow-md">Booking Management</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by location name or address"
          className="p-2 border rounded-lg w-full max-w-md shadow-sm bg-white text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-4 bg-green-600 text-white p-2 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => {
            setShowAddForm(true);
            setEditMode(false);
            setCurrentBookingId(null);
            setNewBooking({
              user_id: 1,
              vehicle_id: 1,
              booking_date: '',
              return_date: '',
              total_amount: 0,
              amount: 0,
              payment_date: '',
              payment_method: '',
              transaction_id: '',
              location_name: '',
              address: '',
              contact_phone: '',
            });
          }}
        >
          {editMode ? 'Edit Booking' : 'Add Booking'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Booking' : 'Add New Booking'}</h2>
          <input
            type="number"
            name="user_id"
            placeholder="User ID"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.user_id || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="vehicle_id"
            placeholder="Vehicle ID"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.vehicle_id || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="booking_date"
            placeholder="Booking Date"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.booking_date || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="return_date"
            placeholder="Return Date"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.return_date || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="total_amount"
            placeholder="Total Amount"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.total_amount || ''}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.amount || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="payment_date"
            placeholder="Payment Date"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.payment_date || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="payment_method"
            placeholder="Payment Method"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.payment_method || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="transaction_id"
            placeholder="Transaction ID"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.transaction_id || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="location_name"
            placeholder="Location Name"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.location_name || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.address || ''}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact_phone"
            placeholder="Contact Phone"
            className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
            value={newBooking.contact_phone || ''}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={handleCreateOrUpdate}
          >
            {editMode ? 'Update Booking' : 'Create Booking'}
          </button>
          <button
            className="bg-red-600 text-white p-3 rounded-lg shadow-md ml-4 hover:bg-red-700 transition"
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-semibold mb-4">Booking List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Vehicle ID</th>
                <th className="py-2 px-4 border-b">Booking Date</th>
                <th className="py-2 px-4 border-b">Return Date</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Payment Date</th>
                <th className="py-2 px-4 border-b">Payment Method</th>
                <th className="py-2 px-4 border-b">Transaction ID</th>
                <th className="py-2 px-4 border-b">Location Name</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Contact Phone</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="py-2 px-4 border-b">{booking.user_id}</td>
                  <td className="py-2 px-4 border-b">{booking.vehicle_id}</td>
                  <td className="py-2 px-4 border-b">{booking.booking_date}</td>
                  <td className="py-2 px-4 border-b">{booking.return_date}</td>
                  <td className="py-2 px-4 border-b">{booking.total_amount}</td>
                  <td className="py-2 px-4 border-b">{booking.payments.amount}</td>
                  <td className="py-2 px-4 border-b">{booking.payments.payment_date}</td>
                  <td className="py-2 px-4 border-b">{booking.payment_method}</td>
                  <td className="py-2 px-4 border-b">{booking.payments.transaction_id}</td>
                  <td className="py-2 px-4 border-b">{booking.location.location_name}</td>
                  <td className="py-2 px-4 border-b">{booking.location.address}</td>
                  <td className="py-2 px-4 border-b">{booking.location.contact_phone}</td>
                  <td className="py-2 px-4 border-b flex space-x-2">
                    <button
                      className="bg-yellow-600 text-white p-2 rounded-lg shadow-md hover:bg-yellow-700 transition"
                      onClick={() => handleEdit(booking)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition"
                      onClick={() => handleDelete(booking.id)}
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
    </div>
  );
};

export default BookingManagementComponent;
