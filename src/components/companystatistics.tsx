// import React from 'react';
import { FaCar, FaUsers, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const CompanyStatistics = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Company Statistics</h2>
        <p className="mt-8 text-gray-700 text-lg leading-relaxed">
          Our progress as a company is based on our customers' satisfaction. Our dedicated teams work around the clock to ensure our services meet the highest standards.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Statistic 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FaCar className="text-5xl text-blue-600 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">540+</h3>
            <p className="text-lg font-semibold text-gray-700">cars</p>
          </div>

          {/* Statistic 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FaUsers className="text-5xl text-blue-600 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">20k+</h3>
            <p className="text-lg font-semibold text-gray-700">customers</p>
          </div>

          {/* Statistic 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FaClock className="text-5xl text-blue-600 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">25+</h3>
            <p className="text-lg font-semibold text-gray-700">Years</p>
          </div>

          {/* Statistic 4 */}
          <div className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
            <FaMapMarkerAlt className="text-5xl text-blue-600 mb-2" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">20m+</h3>
            <p className="text-lg font-semibold text-gray-700">Miles</p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default CompanyStatistics;
