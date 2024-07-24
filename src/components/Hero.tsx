import React, { useState } from 'react';
import { Car, Calendar, Clock, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const [carName, setCarName] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [pickupDateTime, setPickupDateTime] = useState<string>('');

  const handleSearch = () => {
    console.log(`Searching with carName: ${carName}, bookingDate: ${bookingDate}, pickupDateTime: ${pickupDateTime}`);
    // Implement your search logic here
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat bg-[url('https://www.shadowsofafrica.com/media/wysiwyg/Itineraries/Kenya_Nairobi/shutterstock_472598569_1.jpg')] h-[500px] flex items-center justify-center text-center text-white"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-8 max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 leading-tight">Kenya Best Vehicle Rental from $19/Day</h2>
        <p className="text-lg mb-6">Same drop-off - Nairobi, Kenya</p>
        
        <div className="bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Car name entry */}
            <div className="flex items-center flex-grow mb-4 sm:mb-0">
              <Car className="text-yellow-400 mr-2 w-6 h-6" />
              <input
                type="text"
                placeholder="Enter car name"
                className="w-full px-4 py-2 rounded bg-gray-700 placeholder-gray-400 text-gray-200 focus:bg-gray-600 outline-none transition duration-300"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
              />
            </div>
            {/* Booking date and time entry */}
            <div className="flex items-center flex-grow mb-4 sm:mb-0">
              <Calendar className="text-yellow-400 mr-2 w-6 h-6" />
              <input
                type="text"
                placeholder="Booking date and time"
                className="w-full px-4 py-2 rounded bg-gray-700 placeholder-gray-400 text-gray-200 focus:bg-gray-600 outline-none transition duration-300"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
            </div>
            {/* Pick up date and time entry */}
            <div className="flex items-center flex-grow mb-4 sm:mb-0">
              <Clock className="text-yellow-400 mr-2 w-6 h-6" />
              <input
                type="text"
                placeholder="Pickup date and time"
                className="w-full px-4 py-2 rounded bg-gray-700 placeholder-gray-400 text-gray-200 focus:bg-gray-600 outline-none transition duration-300"
                value={pickupDateTime}
                onChange={(e) => setPickupDateTime(e.target.value)}
              />
            </div>
            {/* Search button */}
            <button
              className="bg-yellow-400 text-gray-900 py-2 px-6 rounded-full font-semibold uppercase hover:bg-yellow-300 transition duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Here is why travelers choose KeBest</h3>
          {/* Availability */}
          <div className="flex items-center mb-4 bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <CheckCircle className="text-green-400 mr-2 w-6 h-6" />
            <p>Availability - Our services are available 24/7</p>
          </div>
          {/* Comfort */}
          <div className="flex items-center mb-4 bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <CheckCircle className="text-green-400 mr-2 w-6 h-6" />
            <p>Comfort - Enjoy the best comfort experience</p>
          </div>
          {/* Savings */}
          <div className="flex items-center mb-4 bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <CheckCircle className="text-green-400 mr-2 w-6 h-6" />
            <p>Savings - Our vehicles are fuel reliable with hybrid</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
