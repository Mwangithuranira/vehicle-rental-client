// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import PaymentForm from './PaymentForm';
// import { FaTimes } from 'react-icons/fa';
// import { Booking } from '../types'; // Adjust path as per your project structure

// interface BookingFormProps {
//   onClose: () => void;
//   onBookingSuccess: () => void;
//   booking?: Booking | null; // Make booking prop optional or nullable
// }

// const BookingForm: React.FC<BookingFormProps> = ({ onClose, onBookingSuccess, booking }) => {
//   const [bookingDetails, setBookingDetails] = useState<Partial<Booking>>({
//     userId: '',
//     vehicleId: '',
//     startDate: '',
//     endDate: '',
//   });
//   const [vehicles, setVehicles] = useState<any[]>([]); // Adjust the type as per your actual vehicle type
//   const [showPaymentForm, setShowPaymentForm] = useState(false);
//   const [bookingId, setBookingId] = useState<number | null>(null);

//   useEffect(() => {
//     // Fetch available vehicles from the API
//     axios.get<any[]>('/api/vehicles')
//       .then(response => {
//         setVehicles(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching vehicles:', error);
//       });

//     // Fetch logged-in user details
//     axios.get('/api/user/me')
//       .then(response => {
//         setBookingDetails((prev: Partial<Booking>) => ({ ...prev, userId: response.data.id }));
//       })
//       .catch(error => {
//         console.error('Error fetching user details:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Populate form fields if booking prop changes (for editing)
//     if (booking) {
//       setBookingDetails({
//         userId: booking.userId,
//         vehicleId: booking.vehicleId,
//         startDate: booking.startDate,
//         endDate: booking.endDate,
//       });
//     }
//   }, [booking]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setBookingDetails((prev: Partial<Booking>) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Determine whether to create or update booking based on bookingId presence
//     if (booking) {
//       axios.put(`/api/bookings/${booking.id}`, bookingDetails)
//         .then(() => {
//           onBookingSuccess();
//         })
//         .catch(error => {
//           console.error('Error updating booking:', error);
//         });
//     } else {
//       axios.post('/api/bookings', bookingDetails)
//         .then(response => {
//           setBookingId(response.data.id);
//           setShowPaymentForm(true);
//         })
//         .catch(error => {
//           console.error('Error creating booking:', error);
//         });
//     }
//   };

//   const handlePaymentSuccess = () => {
//     onBookingSuccess();
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-gray-800">Book a Vehicle</h2>
//           <button title='paynow' onClick={onClose} className="text-gray-600 hover:text-gray-800">
//             <FaTimes size={20} />
//           </button>
//         </div>
//         {showPaymentForm && bookingId ? (
//           <PaymentForm bookingId={bookingId} onPaymentSuccess={handlePaymentSuccess} />
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium">Vehicle</label>
//               <select
//                 name="vehicleId"
//                 title='vehicleId'
//                 value={bookingDetails.vehicleId}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               >
//                 <option value="">Select a vehicle</option>
//                 {vehicles.map(vehicle => (
//                   <option key={vehicle.id} value={vehicle.id}>
//                     {vehicle.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium">Start Date</label>
//               <input
//                 type="date"
//                 title='startDate'
//                 name="startDate"
//                 value={bookingDetails.startDate}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium">End Date</label>
//               <input
//                 type="date"
//                 title='endDate'
//                 name="endDate"
//                 value={bookingDetails.endDate}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">
//                 Cancel
//               </button>
//               <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
//                 Submit
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingForm;
