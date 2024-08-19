import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Payment.css'; // Import the CSS file

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount, carDetails } = location.state;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Test User',
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');

      // Create a payment intent on your backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-payment-intent`,
        {
          amount,
          paymentMethodId: paymentMethod.id,
          bookingId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret } = response.data;

      // Confirm the card payment using the client secret
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        toast.error(confirmError.message);

        // Call the backend to confirm the payment failure and update status
        await axios.post(
          `${import.meta.env.VITE_API_URL}/payments/confirm-payment`,
          {
            paymentIntentId: paymentIntent?.id || null,
            error: confirmError.message,  // Pass the error message for logging
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Redirect to the Failed component with reason
        navigate('/failed', {
          state: {
            reason: confirmError.message,
          }
        });
      } else if (paymentIntent.status === 'succeeded') {
        // Call the backend to confirm the payment and update status
        await axios.post(
          `${import.meta.env.VITE_API_URL}/payments/confirm-payment`,
          {
            paymentIntentId: paymentIntent.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success('Payment successful!');
        navigate('/success', {
          state: {
            amount,
            carDetails,
          }
        });
      } else {
        toast.error('Payment failed');
        // Redirect to the Failed component with reason
        navigate('/failed', {
          state: {
            reason: 'Payment failed due to unknown error',
          }
        });
      }

    } catch (err) {
      toast.error('Payment failed');
      console.error('Payment failed:', err);
      // Redirect to the Failed component with reason
      navigate('/failed', {
        state: {
          reason: 'Technical error during payment processing',
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="left-section">
        <img src={carDetails.image} alt={carDetails.name} className="car-image" />
        <div className="car-info">
          <h2>{carDetails.name}</h2>
          <p>Model: {carDetails.model}</p>
          <p>Price per day: {carDetails.rentPerDay} INR/day</p>
          <p>Discount Price: {(carDetails.rentPerDay * 0.9).toFixed(2)} INR/day</p>
        </div>
      </div>

      <div className="right-section">
        <form onSubmit={handleSubmit} className="payment-form">
          <h3>Payment Details</h3>
          <div className="card-element-container">
            <CardElement />
          </div>
          <button type="submit" disabled={!stripe || !elements || loading} className="btn-submit">
            {loading ? 'Processing...' : `Pay ₹${amount}`}
          </button>
        </form>
      </div>
    </div>
  );
};

const Payment = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
