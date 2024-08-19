import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { toast } from 'react-toastify';
import './Review.css'; // Ensure this is imported to apply the styles

const AddReview = () => {
  const { id } = useParams(); // car ID
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post(`/cars/${id}/reviews`, { rating, comment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Review added successfully');
      navigate(`/cars/${id}/reviews`);
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add Review</h2>
      <form onSubmit={handleAddReview}>
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
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
