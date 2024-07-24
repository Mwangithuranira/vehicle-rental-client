import React, { useState, useEffect } from "react";
import axios from "axios";

export interface BookFormProps {
  vehicle_id: string;
  user_id: string;
  location_id: string;
  booking_date: string;
  total_amount: number;
  return_date: string;
}

interface Location {
  id: string;
  location_name: string;
  address: string;
  contact_phone: string;
}

interface Vehicle {
  id: string;
  vehicleSpecification: {
    model: string;
    price: number;
  };
}

const BookForm = () => {
  const [bookingDate, setBookingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [vehicleId, setVehicleId] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const locationsResponse = await axios.get("http://localhost:8000/api/locations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(locationsResponse.data)) {
          setLocations(locationsResponse.data);
        } else {
          throw new Error("Locations data is not an array.");
        }

        const vehiclesResponse = await axios.get("http://localhost:8000/api/vehicles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(vehiclesResponse.data)) {
          setVehicles(vehiclesResponse.data);
        } else {
          throw new Error("Vehicles data is not an array.");
        }

        const storedUserId = localStorage.getItem("userId");
        setUserId(storedUserId);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch locations or vehicles.");
      }
    };

    fetchData();
  }, []);

  const calculateTotalAmount = (bookingDate: string, returnDate: string, price: number) => {
    const bookingDateObj = new Date(bookingDate);
    const returnDateObj = new Date(returnDate);
    const diffTime = Math.abs(returnDateObj.getTime() - bookingDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return price * diffDays;
  };

  const handleCalculateAmount = () => {
    if (selectedPrice === null) {
      setError("Price is not set.");
      return;
    }
    if (!bookingDate || !returnDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const total = calculateTotalAmount(bookingDate, returnDate, selectedPrice);
      setTotalAmount(total);
      setError(null);
    } catch (err) {
      setError("Failed to calculate amount. Please check the dates.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!vehicleId || !userId || !selectedLocation) {
      console.error("Vehicle ID, User ID, or Location is missing.");
      return;
    }

    const bookingDetails: BookFormProps = {
      vehicle_id: vehicleId,
      user_id: userId,
      location_id: selectedLocation,
      booking_date: bookingDate,
      total_amount: totalAmount,
      return_date: returnDate,
    };

    try {
      const token = localStorage.getItem("authToken");

      const bookingResponse = await axios.post("http://localhost:8000/api/bookings", bookingDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const bookingId = bookingResponse.data.msg.id;
      console.log(bookingId);

      const paymentResponse = await axios.post(
        "http://localhost:8000/api/payments",
        {
          bookingId: bookingId,
          amount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkoutUrl = paymentResponse.data.checkoutUrl;

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Failed to create booking or process payment: ", error);
      setError("Failed to create booking or process payment. Please try again.");
    }
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = e.target.value;
    setSelectedVehicleModel(selectedModel);
    const selectedVehicle = vehicles.find((vehicle) => vehicle.vehicleSpecification.model === selectedModel);
    if (selectedVehicle) {
      setVehicleId(selectedVehicle.id);
      setSelectedPrice(selectedVehicle.vehicleSpecification.price);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-blue-800 text-center">Book Your Ride</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="location" className="text-lg font-semibold text-gray-700 mb-2">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={selectedLocation || ""}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select closest Branch location</option>
                {locations.length > 0 ? (
                  locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.location_name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading locations...</option>
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="vehicle" className="text-lg font-semibold text-gray-700 mb-2">
                Vehicle
              </label>
              <select
                id="vehicle"
                name="vehicle"
                value={selectedVehicleModel || ""}
                onChange={handleVehicleChange}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a vehicle</option>
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.vehicleSpecification.model}>
                      {vehicle.vehicleSpecification.model}
                    </option>
                  ))
                ) : (
                  <option value="">Loading vehicles...</option>
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-lg font-semibold text-gray-700 mb-2">
                Price per Day
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={selectedPrice !== null ? selectedPrice : ""}
                readOnly
                className="p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="your location" className="text-lg font-semibold text-gray-700 mb-2">
                your location
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your location"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="text-lg font-semibold text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="contact_phone" className="text-lg font-semibold text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="text"
                id="contact_phone"
                name="contact_phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your contact phone"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="booking_date" className="text-lg font-semibold text-gray-700 mb-2">
                Booking Date
              </label>
              <input
                type="date"
                id="booking_date"
                name="booking_date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="return_date" className="text-lg font-semibold text-gray-700 mb-2">
                Return Date
              </label>
              <input
                type="date"
                id="return_date"
                name="return_date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="total_amount" className="text-lg font-semibold text-gray-700 mb-2">
                Total Amount
              </label>
              <input
                type="number"
                id="total_amount"
                name="total_amount"
                value={totalAmount}
                readOnly
                className="p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCalculateAmount}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Calculate Total Amount
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
