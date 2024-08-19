import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/useAuth';
import { toast } from 'react-toastify';
import './Booking.css'; // Import the new CSS file

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const selectedCar = location.state?.selectedCar;
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [days, setDays] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, []);

  const calculateDays = () => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDays(difference > 0 ? difference : 1);
    }
  };

  useEffect(() => {
    calculateDays();
  }, [fromDate, toDate]);

  if (!selectedCar) {
    toast.error('Car details are missing or incorrect.');
    return null;
  }

  const handleConfirmBooking = async () => {
    if (!token) {
      toast.error('Token is missing, please log in again.');
      navigate('/login');
      return;
    }

    if (!auth?._id) {
      toast.error('You need to log in to book a car');
      navigate('/login');
      return;
    }

    const totalAmount = selectedCar.rentPerDay * days;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        userId: auth._id,
        carId: selectedCar._id,
        fromDate,
        toDate,
        amount: totalAmount,
        days,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const { booking, clientSecret } = response.data;

      navigate('/payment', {
        state: {
          clientSecret,
          bookingId: booking._id,
          amount: totalAmount,
          carDetails: selectedCar // Make sure to include this
        }
      });
      
      toast.success('Booking initiated! Proceed to payment.');

    } catch (error) {
      toast.error('Booking failed. Please try again.');
    }
  };

  return (
    <div className="booking-container">
      <div className="left-section">
        <img src={selectedCar?.image} alt={selectedCar?.name} className="car-image" />
        <div className="car-info">
          <h2>{selectedCar?.name}</h2>
          <p>Model: {selectedCar?.model}</p>
          <p>Price per day: {selectedCar?.rentPerDay} INR/day</p>
          <p>Discount Price: {(selectedCar?.rentPerDay * 0.9).toFixed(2)} INR/day</p>
        </div>
      </div>

      <div className="right-section">
        <div className="payment-details">
          <h3>Payment Details</h3>
          <div className="booking-form">
            <label htmlFor="fromDate">From Date:</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
            <label htmlFor="toDate">To Date:</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
            <div className="summary">
              <p>Total Days: {days}</p>
              <p>Total Price: {(selectedCar?.rentPerDay * days * 0.9).toFixed(2)} INR</p>
            </div>
          </div>

          <div className="payment-method">
            <label htmlFor="paymentMode">Select Payment Mode:</label>
            <select id="paymentMode" disabled>
              <option value="card">Card (Only)</option>
            </select>
          </div>

          <button onClick={handleConfirmBooking} className="btn-confirm">Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
