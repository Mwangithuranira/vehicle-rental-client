import React, { useState } from 'react';
import axios from 'axios';

interface PaymentFormProps {
  bookingId: number;
  onPaymentSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ bookingId, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    mpesaCode: '',
    creditCardNumber: '',
    creditCardExpiry: '',
    creditCardCVC: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentData = {
      bookingId,
      paymentMethod,
      paymentDetails,
    };
    axios.post('/api/payments', paymentData).then(() => {
      onPaymentSuccess();
    });
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Complete Payment</h3>
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Payment Method</label>
          <select
            name="paymentMethod"
            title='paymentMethod'
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a payment method</option>
            <option value="mpesa">Mpesa Paybill</option>
            <option value="creditcard">Credit Card</option>
          </select>
        </div>
        {paymentMethod === 'mpesa' && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Mpesa Payment Code</label>
            <input
              type="text"
              title='mpesaCode'
              name="mpesaCode"
              value={paymentDetails.mpesaCode}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
        {paymentMethod === 'creditcard' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Credit Card Number</label>
              <input
                type="text"
                title='creditCardNumber'
                name="creditCardNumber"
                value={paymentDetails.creditCardNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Expiry Date</label>
              <input
                type="text"
                title='creditCardExpiry'
                name="creditCardExpiry"
                value={paymentDetails.creditCardExpiry}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">CVC</label>
              <input
                type="text"
                title='creditCardCVC'
                name="creditCardCVC"
                value={paymentDetails.creditCardCVC}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        )}
        <div className="flex justify-end space-x-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Confirm Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
