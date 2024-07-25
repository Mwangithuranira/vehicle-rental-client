import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Ticket interface
interface Ticket {
  id: string;
  ticket_subject: string;  // ticket_subject
  ticket_description: string;  // ticket_description
  user?: {  // Optional user object
    full_name: string;
    phone_number?: string;  // Optional field
    address?: string;  // Optional field
    email: string;
  };
}

const CustomerTicketsComponent: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the authorization token from local storage or context
  const token = localStorage.getItem('authToken'); // or however you store your token

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Configure Axios with the authorization header
        const response = await axios.get('https://car-rental-dtbfg2hfd7abagfu.eastus-01.azurewebsites.net/api/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the header
          },
        });
        setTickets(response.data);
      } catch (err) {
        setError('Error fetching tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]); // Add token to dependencies array if it's dynamic

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Customer Tickets
      </h1>
      
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Full Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Phone Number</th>
            <th className="px-4 py-2 border-b">Address</th>
            <th className="px-4 py-2 border-b">Subject</th>
            <th className="px-4 py-2 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="border px-4 py-2">{ticket.id}</td>
              <td className="border px-4 py-2">{ticket.user?.full_name || 'N/A'}</td>
              <td className="border px-4 py-2">{ticket.user?.email || 'N/A'}</td>
              <td className="border px-4 py-2">{ticket.user?.phone_number || 'N/A'}</td>
              <td className="border px-4 py-2">{ticket.user?.address || 'N/A'}</td>
              <td className="border px-4 py-2">{ticket.ticket_subject}</td>
              <td className="border px-4 py-2">{ticket.ticket_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTicketsComponent;
