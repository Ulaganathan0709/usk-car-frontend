import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api'; // Import the API utility
import { toast } from 'react-toastify';
import './ViewBooking.css'; // Import the CSS file for styling

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('You need to log in to view your bookings.');
          navigate('/login');
          return;
        }

        const response = await api.get('/bookings/user', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
          },
        });

        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');  // Redirect to login if unauthorized
        } else {
          toast.error('Failed to fetch booking details');
        }
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('You need to log in to cancel a booking.');
        navigate('/login');
        return;
      }
  
      const response = await api.post(`/bookings/${bookingId}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
        },
      });
  
      if (response.status === 200) {
        const { amount, last4 } = response.data.refundTransaction; // Extract the amount and last4 digits
  
        toast.success('Booking cancelled successfully');
  
        // Navigate to the refund page with the refund details
        navigate('/Refund', {
          state: {
            amount: amount || 'N/A', // Fallback to booking amount if refund amount is not available
            last4: last4 || '4242', // Provide a fallback if last4 is not available
          },
        });
  
        setBookings(bookings.filter((booking) => booking._id !== bookingId)); // Update the state to remove the cancelled booking
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };
  
  if (loading) return <p>Loading...</p>;

  return (
    <div className="booking-list-container">
      <h1 className="booking-header">My Bookings</h1>
      <div className="booking-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              {booking.carId && (
                <>
                  <img src={booking.carId.image} alt={booking.carId.name} className="car-image" />
                  <div className="booking-details">
                    <h3>Car: {booking.carId.name}</h3>
                    <p>From Date: {new Date(booking.fromDate).toLocaleDateString()}</p>
                    <p>To Date: {new Date(booking.toDate).toLocaleDateString()}</p>
                    <p>Amount: ₹{booking.amount}</p>
                    <p>Status: {booking.status}</p>
                  </div>
                </>
              )}
              {!booking.carId && (
                <div className="booking-details">
                  <h3>Car details not available</h3>
                  <p>From Date: {new Date(booking.fromDate).toLocaleDateString()}</p>
                  <p>To Date: {new Date(booking.toDate).toLocaleDateString()}</p>
                  <p>Amount: ₹{booking.amount}</p>
                  <p>Status: {booking.status}</p>
                </div>
              )}
              <div className="booking-actions">
                {new Date(booking.fromDate) > new Date() && booking.status !== 'Cancelled' && (
                  <button onClick={() => cancelBooking(booking._id)} className="btn btn-primary">Cancel Booking</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="no-bookings">No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default ViewBooking;
