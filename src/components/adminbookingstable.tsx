// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BookingItem from './BookingItem'; // Assuming BookingItem is correctly implemented
// import { Booking } from '../types'; // Adjust path as necessary

// const AdminBookingsTable: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     axios.get('/api/admin/bookings')
//       .then((response) => {
//         setBookings(response.data);
//         setFilteredBookings(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching bookings:', error);
//       });
//   };

//   const handleEdit = (editedBooking: Booking) => {
//     // Implement your edit logic here
//     console.log('Editing booking:', editedBooking);
//     // Example of updating state after editing
//     const updatedBookings = bookings.map((booking) =>
//       booking.id === editedBooking.id ? editedBooking : booking
//     );
//     setBookings(updatedBookings);
//     setFilteredBookings(updatedBookings);
//   };

//   const handleDelete = (bookingId: string) => {
//     // Implement your delete logic here
//     console.log('Deleting booking:', bookingId);
//     // Example of updating state after deleting
//     const updatedBookings = bookings.filter((booking) => booking.id !== parseInt(bookingId));
//     setBookings(updatedBookings);
//     setFilteredBookings(updatedBookings);
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);
//     const filtered = bookings.filter((booking) =>
//       booking.full_name.toLowerCase().includes(searchTerm)
//     );
//     setFilteredBookings(filtered);
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by customer name"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Customer Name
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Vehicle
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Start Date
//             </th>
//             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               End Date
//             </th>
//             <th scope="col" className="relative px-6 py-3">
//               <span className="sr-only">Edit</span>
//             </th>
//             <th scope="col" className="relative px-6 py-3">
//               <span className="sr-only">Delete</span>
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {filteredBookings.map((booking) => (
//             <BookingItem
//               key={booking.id}
//               booking={booking}
//               onEdit={handleEdit}
//               onDelete={() => handleDelete(booking.id.toString())}
//             />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminBookingsTable;
