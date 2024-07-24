import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUsers, FaChartBar, FaCar,
   FaMapMarkerAlt, FaUserCircle, FaShieldAlt, FaCogs,
    FaQuestionCircle, FaComments, FaSun, FaMoon, FaTicketAlt, FaClipboardList } from 'react-icons/fa';
import AdminCompanyStatistics from './adminstastics';
import ManageVehiclesComponent from './admincarlist'
// import CarList from './admincarlist';
import Location from './googlemaps';
import BookingsComponent from './BookingComponent';
import UserManagement from './userlist';
import TicketManagementComponent from './admintickets'
const AdminSidebar: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const sidebarItems = [
    { path: "/", icon: <FaUsers />, label: "Homepage", section: "General" },
    { path: "#adminstats", icon: <FaChartBar />, label: "Company Statistics", section: "General" },
    { path: "#carlist", icon: <FaCar />, label: "Fleet Management", section: "Manage Vehicles" },
    { path: "#location", icon: <FaMapMarkerAlt />, label: "Locations", section: "Manage Vehicles" },
    { path: "#manage-users", icon: <FaUsers />, label: "Manage Users", section: "Manage Users" },
    { path: "#manage-bookings", icon: <FaClipboardList />, label: "Manage Bookings", section: "Manage Bookings" },
    { path: "#manage-tickets", icon: <FaTicketAlt />, label: "Manage Tickets", section: "Manage Tickets" },
    { path: "#carlist", icon: <FaCar />, label: "Manage Cars", section: "Manage Cars" },
    { path: "#activity", icon: <FaUserCircle />, label: "Activity", section: "Myspace" },
    { path: "#shared", icon: <FaShieldAlt />, label: "Shared", section: "Myspace" },
    { path: "#privacy", icon: <FaShieldAlt />, label: "Privacy", section: "Myspace" },
    { path: "#setting", icon: <FaCogs />, label: "Setting", section: "Support" },
    { path: "/help", icon: <FaQuestionCircle />, label: "Help", section: "Support" },
    { path: "/chat", icon: <FaComments />, label: "Chat", section: "Support" },
  ];

  const filteredItems = sidebarItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);     
    return acc;
  }, {} as Record<string, typeof sidebarItems>);

  const handleNavigation = (path: string) => {
    if (path.startsWith('#')) {
      // Scroll to section
      navigate(path); // Update URL fragment
      setTimeout(() => {
        document.querySelector(path)?.scrollIntoView({ behavior: 'smooth' });
      }, 0); // Allow URL update to complete
    } else {
      // Navigate to different page
      navigate(path);
    }
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className={`w-64 hover:w-80 transition-width duration-300 ease-in-out shadow-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} flex-none`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex-grow overflow-y-auto">
            <div className="flex items-center mb-6">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`ml-2 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <nav className="space-y-2">
              {Object.entries(groupedItems).map(([section, items]) => (
                <div key={section}>
                  <h2 className="text-gray-400 text-sm mb-2">{section}</h2>
                  <ul className="space-y-1">
                    {items.map((item) => (
                      <li key={item.path} className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <button
                          onClick={() => handleNavigation(item.path)}
                          className={`flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'} w-full text-left`}
                        >
                          {item.icon}
                          <span className="ml-2">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="p-6 border-t border-gray-700 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Toggle {darkMode ? 'Light' : 'Dark'} Mode</span>
              <button
                onClick={toggleDarkMode}
                className={`ml-2 rounded-full p-2 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-yellow-400" />}
              </button>
            </div>
            <div className="flex items-center">
              <FaUserCircle className={`text-2xl ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} />
              <div className="ml-2">
                <h2 className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Jane Doe</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow p-6 overflow-y-auto">
        <div id="homepage">
          {/* Homepage Content */}
        </div>
        <div id="adminstats">
          <AdminCompanyStatistics />
        </div>
        <div id="carlist">
          <ManageVehiclesComponent />
        </div>
        <div id="location">
          <Location />
        </div>
        <div id='manage-bookings'>
          <BookingsComponent />
        </div>
        <div id="manage-users">
          <UserManagement />
        </div>
       <div id="manage-tickets">
        <TicketManagementComponent/>

        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
