// import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            About KeBest Car Rentals
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Providing Exceptional Car Rental Services Since 2005
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-12">
            <div className="text-center space-y-6">
              <img
                src="https://example.com/image1.jpg"
                alt="Office Image"
                className="h-60 w-full object-cover rounded-lg shadow-md"
              />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Our Headquarters</h3>
                <p className="text-gray-500">
                  Located in the heart of Nairobi, our headquarters ensure smooth operations and
                  exceptional service delivery.
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <img
                src="https://example.com/image2.jpg"
                alt="Team Image"
                className="h-60 w-full object-cover rounded-lg shadow-md"
              />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Our Team</h3>
                <p className="text-gray-500">
                  Our dedicated team of professionals works tirelessly to ensure our customers
                  receive the best experience.
                </p>
              </div>
            </div>
            <div className="text-center space-y-6">
              <img
                src="https://example.com/image3.jpg"
                alt="Customer Service Image"
                className="h-60 w-full object-cover rounded-lg shadow-md"
              />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Customer Satisfaction</h3>
                <p className="text-gray-500">
                  We prioritize customer satisfaction, providing flexible rental plans and
                  round-the-clock support.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="max-w-2xl mx-auto text-xl text-gray-500">
            KeBest Car Rentals is committed to delivering reliable, affordable, and innovative
            car rental solutions tailored to meet your travel needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
