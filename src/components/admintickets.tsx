import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Ticket interface
interface Ticket {
  id: string;
  subject: string;
  user:{
    full_name: string;
    email: string;
  }
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
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
            <th className="px-4 py-2 border-b">subject</th>
            <th className="px-4 py-2 border-b">description</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Created At</th>
            <th className="px-4 py-2 border-b">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="border px-4 py-2">{ticket.id}</td>
              <td className="border px-4 py-2">{ticket.user.full_name}</td>
              <td className="border px-4 py-2">{ticket.user.email}</td>
              <td className="border px-4 py-2">{ticket.subject}</td>
              <td className="border px-4 py-2">{ticket.description}</td>
              <td className="border px-4 py-2">{ticket.status}</td>
              <td className="border px-4 py-2">{ticket.created_at}</td>
              <td className="border px-4 py-2">{ticket.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTicketsComponent;