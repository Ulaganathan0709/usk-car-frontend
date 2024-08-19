import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';
import './Review.css'; // Ensure this is imported to apply the styles

const EditReview = () => {
  const { id } = useParams(); // car ID
  const { state } = useLocation(); // the review to edit is passed through the state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.review) {
      setRating(state.review.rating);
      setComment(state.review.comment);
    }
  }, [state?.review]);

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`/cars/reviews/${state.review._id}`, { rating, comment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Review updated successfully');
      navigate(`/cars/${id}/reviews`);
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  return (
    <div className="edit-review-container">
      <h2>Edit Review</h2>
      <form onSubmit={handleUpdateReview}>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            id="rating"
            type="number"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Review</button>
      </form>
    </div>
  );
};

export default EditReview;
