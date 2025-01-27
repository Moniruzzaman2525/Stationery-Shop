import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAppSelector } from '../../redux/hooks';
import { usePaymentData } from '../../redux/feathers/order/orderSlice';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const paymentData = useAppSelector(usePaymentData);
  const clientSecret = paymentData?.client_secret;
  console.log(paymentData)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !paymentData) return;

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card details not entered.');
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (stripeError) {
      setError(stripeError.message || 'Payment failed. Try again.');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess('Payment succeeded!');
    } else {
      setError('Payment failed. Try again.');
    }

    setProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Complete Your Payment</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-end space-x-4">
          <label htmlFor="card" className="text-gray-700 font-medium flex items-center">
            <span className="mr-2">Card</span>
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-6 h-6" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" className="w-6 h-6 ml-2" />
            <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="w-6 h-6 ml-2" />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="card-element" className="text-gray-700 font-medium">
          Enter Card Details
        </label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Country</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="UK">United Kingdom</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-[#001845] text-white py-3 px-4 rounded-lg transition disabled:bg-gray-400"
      >
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
