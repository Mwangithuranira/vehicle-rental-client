// import React from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// import { Booking } from '../types';

// interface BookingItemProps {
//   booking: Booking;
//   onDelete: (id: number) => void;
//   onEdit: (booking: Booking) => void;
// }

// const BookingItem: React.FC<BookingItemProps> = ({ booking, onDelete, onEdit }) => {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition duration-300 hover:shadow-lg">
//       <div>
//         <h3 className="text-xl font-semibold text-gray-800">{booking.vehicleName}</h3>
//         <p className="text-gray-600">
//           {booking.startDate} - {booking.endDate}
//         </p>
//       </div>
//       <div className="flex space-x-2">
//         <button
//         title='edit'
//           onClick={() => onEdit(booking)}
//           className="text-yellow-500 hover:text-yellow-600"
//         >
//           <FaEdit size={20} />
//         </button>
//         <button
//         title='delete'
//           onClick={() => onDelete(booking.id)}
//           className="text-red-500 hover:text-red-600"
//         >
//           <FaTrash size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingItem;
