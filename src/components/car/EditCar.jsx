import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/api';
import './EditCar.css'; // Import the CSS file

const EditCar = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [image, setImage] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');
  const [speed, setSpeed] = useState('');
  const [seats, setSeats] = useState('');
  const [transmission, setTransmission] = useState('Manual');
  const [fuelType, setFuelType] = useState('Petrol');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await api.get(`/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in request
          },
        });
        const car = response.data;
        setName(car.name || '');
        setModel(car.model || '');
        setImage(car.image || '');
        setRentPerDay(car.rentPerDay || '');
        setSpeed(car.speed || '');
        setSeats(car.seats || '');
        setTransmission(car.transmission || 'Manual');
        setFuelType(car.fuelType || 'Petrol');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Unauthorized. Please log in.');
          navigate('/login'); // Redirect to login if unauthorized
        } else {
          toast.error('Failed to load car details');
        }
      }
    };
    fetchCar();
  }, [id, navigate]);

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/cars/${id}`, 
      { name, model, image, rentPerDay, speed, seats, transmission, fuelType }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in request
        },
      });
      if (response.status === 200) {
        toast.success('Car updated successfully');
        navigate('/cars'); // Redirect to car listing page
      }
    } catch (error) {
      toast.error('Failed to update car');
    }
  };

  return (
    <div className="edit-car-container">
      <h2>Edit Car</h2>
      {image && <img src={image} alt={name} className="car-image-preview" />}
      <form onSubmit={handleUpdateCar}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rent Per Day</label>
          <input
            type="number"
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Speed</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Seats</label>
          <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Transmission</label>
          <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div>
          <label>Fuel Type</label>
          <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;
