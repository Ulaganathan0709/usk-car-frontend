import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import './AddCar.css'; // Import the CSS file

const AddCar = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [rentPerDay, setRentPerDay] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [seats, setSeats] = useState(4);
  const [transmission, setTransmission] = useState('Manual');
  const [fuelType, setFuelType] = useState('Petrol');
  const [availability, setAvailability] = useState(true); // Add availability state
  const navigate = useNavigate();

  const handleAddCar = async (e) => {
    e.preventDefault();
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication required. Please log in.');
        navigate('/login');
        return;
      }

      const response = await api.post('/cars', {
        name, model, image, rentPerDay, speed, seats, transmission, fuelType, availability
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        }
      });
      if (response.status === 201) {
        toast.success('Car added successfully');
        navigate('/cars'); // Redirect to car listing page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add car');
    }
  };

  return (
    <div className="add-car-container">
      <h2>Add New Car</h2>
      <form onSubmit={handleAddCar} className="add-car-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="model">Model</label>
          <input 
            id="model"
            type="text" 
            value={model} 
            onChange={(e) => setModel(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input 
            id="image"
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="rentPerDay">Rent Per Day</label>
          <input 
            id="rentPerDay"
            type="number" 
            value={rentPerDay} 
            onChange={(e) => setRentPerDay(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="speed">Speed</label>
          <input 
            id="speed"
            type="number" 
            value={speed} 
            onChange={(e) => setSpeed(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="seats">Seats</label>
          <input 
            id="seats"
            type="number" 
            value={seats} 
            onChange={(e) => setSeats(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="transmission">Transmission</label>
          <select 
            id="transmission"
            value={transmission} 
            onChange={(e) => setTransmission(e.target.value)} 
          >
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fuelType">Fuel Type</label>
          <select 
            id="fuelType"
            value={fuelType} 
            onChange={(e) => setFuelType(e.target.value)} 
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select 
            id="availability"
            value={availability} 
            onChange={(e) => setAvailability(e.target.value === 'true')} 
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
