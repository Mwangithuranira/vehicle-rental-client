import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminCompanyStatistics: React.FC = () => {
  // Data based on provided statistics
  const pass7DayData = {
    labels: ['Customers', 'Orders'],
    datasets: [
      {
        label: 'Pass 7 Day',
        data: [8, 12],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.1,
      },
    ],
  };

  const incomeExpenseData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [2000, 425],
        backgroundColor: ['#F59E0B', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const bookingsAnalysisData = {
    labels: ['Pending Bookings', 'Successful Bookings', 'Cancelled Bookings'],
    datasets: [
      {
        label: 'Bookings Analysis',
        data: [24, 60, 16],
        backgroundColor: ['#F59E0B', '#10B981', '#EF4444'],
        borderWidth: 1,
      },
    ],
  };

  const customerRetentionData = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        label: 'Customer Retention',
        data: [150, 350],
        backgroundColor: ['#10B981', '#3B82F6'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Company Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pass 7 Day */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Pass 7 Day</h3>
          <Line data={pass7DayData} />
        </div>

        {/* Income and Expenses */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Income vs Expenses</h3>
          <div className="flex justify-between mb-2">
            <div>
              <span className="font-semibold">${incomeExpenseData.datasets[0].data[0]}</span>{' '}
              <span className="text-gray-500">Income</span>
            </div>
            <div>
              <span className="font-semibold">${incomeExpenseData.datasets[0].data[1]}</span>{' '}
              <span className="text-gray-500">Expenses</span>
            </div>
          </div>
          <Line data={incomeExpenseData} />
        </div>

        {/* Bookings Analysis */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Bookings Analysis</h3>
          <Pie data={bookingsAnalysisData} />
        </div>

        {/* Customer Retention */}
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Customer Retention</h3>
          <Pie data={customerRetentionData} />
        </div>
      </div>
    </div>
  );
};

export default AdminCompanyStatistics;
