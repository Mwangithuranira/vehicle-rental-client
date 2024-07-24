// StripeCheckoutForm.tsx

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface BookingDetails {
  vehicle_id: string;
  user_id: string;
  booking_date: string;
  total_amount: number;
  amount: number;
  location_name: string;
  address: string;
  contact_phone: string;
  return_date: string;
}

const StripeCheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const fetchBookingDetails = () => {
    // Retrieve booking details from local storage
    const storedDetails = localStorage.getItem('bookingDetails');
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails));
    }
  };

  React.useEffect(() => {
    fetchBookingDetails();
  }, []);

  const handlePayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create Payment Intent
      const { data } = await axios.post('http://localhost:8000/create-payment-intent', {
        amount: bookingDetails?.total_amount,
      });

      const clientSecret = data.clientSecret;

      // Confirm Card Payment
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (paymentResult.error) {
        setErrorMessage(paymentResult.error.message || 'Payment failed. Please try again.');
        setIsProcessing(false);
      } else {
        if (paymentResult.paymentIntent?.status === 'succeeded') {
          // Payment successful, save booking details to the database
          await axios.post('http://localhost:8000/api/bookings', {
            ...bookingDetails,
            stripe_payment_id: paymentResult.paymentIntent.id,
          });

          setErrorMessage(null);
          alert('Payment successful! Your booking is confirmed.');
          navigate('/'); // Redirect to home page or bookings page
        }
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('An error occurred while processing payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
            className="p-3 border border-gray-300 rounded-md"
          />
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md ${
            isProcessing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
