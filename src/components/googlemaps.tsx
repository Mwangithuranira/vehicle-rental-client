import React, { useState } from 'react';

const Location: React.FC = () => {
  const [query, setQuery] = useState('');

  // Function to handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Function to handle search action (currently does nothing since iframe is static)
  const handleSearch = () => {
    // Add search logic here if needed
    console.log('Searching for:', query);
  };

  return (
    <div className="w-full h-screen bg-gray-200 p-2">
      <div className="relative w-full h-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center p-4 absolute top-2 left-2 right-2 z-10 bg-white shadow-md rounded-md space-x-2">
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search for a location..."
            className="p-2 border border-gray-300 rounded-md shadow-sm text-black bg-white w-3/4 sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white font-bold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        <div className="w-full h-full mt-12">
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1y_apse2-x4b37U8r-CdNM0MdCTQGrzM&ehbc=2E312F"
            className="w-full h-full border-0"
            title="Google Map Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
