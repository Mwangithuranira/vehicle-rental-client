// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BookingItem from './BookingItem';
// import BookingForm from './BookingForm';
// import { Booking } from '../types'; // Adjust path as per your project structure

// const BookingTable: React.FC = () => {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

//   useEffect(() => {
//     // Fetch bookings for the logged-in user
//     axios.get<Booking[]>('/api/bookings')
//       .then(response => {
//         setBookings(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching bookings:', error);
//       });
//   }, []);

//   const handleDelete = (id: number) => {
//     axios.delete(`/api/bookings/${id}`)
//       .then(() => {
//         setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
//       })
//       .catch(error => {
//         console.error('Error deleting booking:', error);
//       });
//   };

//   const handleEdit = (booking: import("../types").Booking) => {
//     setEditingBooking(booking);
//     setShowForm(true);
//   };

//   const handleBookingSuccess = () => {
//     axios.get<Booking[]>('/api/bookings')
//       .then(response => {
//         setBookings(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching bookings:', error);
//       });
//     setShowForm(false);
//     setEditingBooking(null);
//   };

//   return (
//     <div>
//       {bookings.map(booking => (
//         <BookingItem
//           key={booking.id}
//           booking={booking}
//           onDelete={handleDelete}
//             onEdit={handleEdit}
//         />
//       ))}
//       {showForm && (
//         <BookingForm
//           onClose={() => setShowForm(false)}
//           onBookingSuccess={handleBookingSuccess}
//           booking={editingBooking}
//         />
//       )}
//     </div>
//   );
// };

// export default BookingTable;
