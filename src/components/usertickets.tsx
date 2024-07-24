// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = 'http://localhost:8000/api';

// // Default Axios instance with Authorization header
// const axiosInstance = axios.create({
//   baseURL: API_URL,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Ensure Bearer token format
//   }
//   return config;
// });

// type Ticket = {
//   id: number;
//   user_id: number;
//   ticket_subject: string;
//   ticket_description: string;
//   ticket_status: string;
// };

// const TicketManagementComponent: React.FC = () => {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [currentTicketId, setCurrentTicketId] = useState<number | null>(null);
//   const [newTicket, setNewTicket] = useState({
//     user_id: 1,
//     ticket_subject: '',
//     ticket_description: '',
//     ticket_status: '',
//   });

//   useEffect(() => {
//     fetchTickets();
//   }, []);

//   const fetchTickets = async () => {
//     try {
//       const userId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage
//       if (!userId) throw new Error('User ID not found');

//       const response = await axiosInstance.get(`/tickets?user_id=${userId}`);
//       setTickets(response.data);
//     } catch (error) {
//       console.error('Error fetching tickets', error);
//     }
//   };

//   const handleCreateOrUpdate = async () => {
//     try {
//       const payload = {
//         user_id: Number(newTicket.user_id) || 1,
//         ticket_subject: newTicket.ticket_subject || '',
//         ticket_description: newTicket.ticket_description || '',
//         ticket_status: newTicket.ticket_status || '',
//       };
  
//       console.log('Sending payload:', payload); // Debugging log
  
//       if (editMode && currentTicketId !== null) {
//         // PUT request for updating ticket by ID
//         await axiosInstance.put(`/tickets/${currentTicketId}`, payload);
//       } else {
//         // POST request for creating ticket
//         await axiosInstance.post('/tickets', payload);
//       }
  
//       // Refresh the ticket list
//       fetchTickets();
  
//       // Reset form and state
//       setNewTicket({
//         user_id: 1,
//         ticket_subject: '',
//         ticket_description: '',
//         ticket_status: '',
//       });
//       setShowAddForm(false);
//       setEditMode(false);
//       setCurrentTicketId(null);
//     } catch (error) {
//       console.error('Error creating/updating ticket', error);
//       if (axios.isAxiosError(error)) {
//         console.error('Axios error message:', error.message);
//         console.error('Axios error response:', error.response?.data);
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewTicket((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEdit = (ticket: Ticket) => {
//     setNewTicket(ticket);
//     setEditMode(true);
//     setShowAddForm(true);
//     setCurrentTicketId(ticket.id); // Set current ticket ID for updates
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       // DELETE request for deleting ticket
//       await axiosInstance.delete(`/tickets/${id}`);
//       setTickets(tickets.filter((ticket) => ticket.id !== id));
//     } catch (error) {
//       console.error('Error deleting ticket', error);
//     }
//   };

//   const filteredTickets = tickets.filter((ticket) => {
//     const subject = ticket.ticket_subject || '';  // Default to empty string if undefined
//     const description = ticket.ticket_description || ''; // Default to empty string if undefined
//     const status = ticket.ticket_status || '';  // Default to empty string if undefined
//     const search = searchQuery.toLowerCase();

//     return subject.toLowerCase().includes(search) ||
//       description.toLowerCase().includes(search) ||
//       status.toLowerCase().includes(search);
//   });

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4 bg-blue-700 p-4 rounded-lg text-white shadow-md">Ticket Management</h1>

//       <div className="mb-4 flex items-center">
//         <input
//           type="text"
//           placeholder="Search by subject, description, or status"
//           className="p-2 border rounded-lg w-full max-w-md shadow-sm bg-white text-black"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button
//           className="ml-4 bg-green-600 text-white p-2 rounded-lg shadow-md hover:bg-green-700 transition"
//           onClick={() => {
//             setShowAddForm(true);
//             setEditMode(false);
//             setCurrentTicketId(null);
//             setNewTicket({
//               user_id: 1,
//               ticket_subject: '',
//               ticket_description: '',
//               ticket_status: '',
//             });
//           }}
//         >
//           {editMode ? 'Edit Ticket' : 'Add Ticket'}
//         </button>
//       </div>

//       {showAddForm && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-300">
//           <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Ticket' : 'Add New Ticket'}</h2>
//           <input
//             type="text"
//             name="ticket_subject"
//             placeholder="Ticket Subject"
//             className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
//             value={newTicket.ticket_subject || ''}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="ticket_description"
//             placeholder="Ticket Description"
//             className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
//             value={newTicket.ticket_description || ''}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="ticket_status"
//             placeholder="Ticket Status"
//             className="p-3 border rounded-lg mb-3 w-full bg-gray-50 text-black"
//             value={newTicket.ticket_status || ''}
//             onChange={handleInputChange}
//           />
//           <button
//             className="bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition"
//             onClick={handleCreateOrUpdate}
//           >
//             {editMode ? 'Update Ticket' : 'Add Ticket'}
//           </button>
//         </div>
//       )}

//       <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
//         <h2 className="text-2xl font-semibold mb-4">All Tickets</h2>
//         <ul className="space-y-4">
//           {filteredTickets.map((ticket) => (
//             <li key={ticket.id} className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
//               <h3 className="text-xl font-semibold">{ticket.ticket_subject}</h3>
//               <p>{ticket.ticket_description}</p>
//               <p className="text-sm text-gray-600">Status: {ticket.ticket_status}</p>
//               <button
//                 className="bg-yellow-500 text-white p-2 rounded-lg shadow-md hover:bg-yellow-600 transition mr-2"
//                 onClick={() => handleEdit(ticket)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition"
//                 onClick={() => handleDelete(ticket.id)}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TicketManagementComponent;
