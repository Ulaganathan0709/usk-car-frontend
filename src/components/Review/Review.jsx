import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { useAuth } from '../../context/useAuth.jsx';
import './Review.css';

const Review = () => {
  const { id } = useParams(); // car ID
  const [reviews, setReviews] = useState([]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/cars/${id}/reviews`);
        setReviews(response.data); // Set the reviews data
      } catch (error) {
        toast.error('Failed to fetch reviews');
      }
    };
    fetchReviews();
  }, [id]);

  const handleDeleteReview = async (reviewId) => {
  console.log('Deleting review with ID:', reviewId); // Debugging line
  try {
    const token = localStorage.getItem('token');
    await api.delete(`/cars/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
    console.log('Delete completed review ID:', reviewId);
    setReviews(reviews.filter(review => review._id !== reviewId));
    toast.success('Review deleted successfully');
  } catch (error) {
    toast.error('Failed to delete review');
  }
};


  const handleEditClick = (review) => {
    navigate(`/cars/${id}/edit-review`, { state: { review } });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars).fill().map((_, i) => (
          <span key={i} className="star filled">★</span>
        ))}
        {Array(emptyStars).fill().map((_, i) => (
          <span key={i} className="star empty">★</span>
        ))}
      </>
    );
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <div className="review-list">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review?._id} className="review-item">
              <h3>{review?.user?.name || 'Anonymous'}</h3>
              <div className="rating">{renderStars(review?.rating || 0)}</div>
              <p>Rating: {review?.rating || 'No Rating'}</p>
              <p>Comment: {review?.comment || 'No Comment'}</p>
              {(auth?._id && review?.user && auth._id === review.user._id) && (
                <>
                  <button onClick={() => handleEditClick(review)} className="btn btn-secondary">Edit</button>
                  <button onClick={() => handleDeleteReview(review._id)} className="btn btn-danger">Delete</button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
      {auth?._id && (
        <div className="add-review-button">
          <Link to={`/cars/${id}/add-review`} className="btn btn-primary">Add Review</Link>
        </div>
      )}
    </div>
  );
};

export default Review;
