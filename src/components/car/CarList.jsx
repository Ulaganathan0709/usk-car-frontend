import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './CarList.css'; // Import the CSS file

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: 1000,
    maxPrice: 500000,
    seats: '',
    fuelType: '',
    transmission: '',
    availability: true,
    minSpeed: '', // Add minSpeed for speed filtering
    maxSpeed: '', // Add maxSpeed for speed filtering
  });
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        setCars(response.data);
        applyFilters(response.data);
      } catch (error) {
        toast.error('Failed to fetch cars');
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters(cars);
  }, [filters]);

  const applyFilters = (carsList) => {
    let filtered = carsList;

    if (filters.minPrice) {
      filtered = filtered.filter(car => car.rentPerDay >= filters.minPrice);
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(car => car.rentPerDay <= filters.maxPrice);
    }
    if (filters.seats) {
      filtered = filtered.filter(car => car.seats === parseInt(filters.seats));
    }
    if (filters.fuelType) {
      filtered = filtered.filter(car => car.fuelType === filters.fuelType);
    }
    if (filters.transmission) {
      filtered = filtered.filter(car => car.transmission === filters.transmission);
    }
    if (filters.availability) {
      filtered = filtered.filter(car => car.availability === filters.availability);
    }
    if (filters.minSpeed) {
      filtered = filtered.filter(car => car.speed >= filters.minSpeed);
    }
    if (filters.maxSpeed) {
      filtered = filtered.filter(car => car.speed <= filters.maxSpeed);
    }

    setFilteredCars(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await api.delete(`/cars/${carId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCars(cars.filter(car => car._id !== carId));
        toast.success('Car deleted successfully');
      } catch (error) {
        toast.error('Failed to delete car');
      }
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars).fill().map((_, idx) => (
          <svg key={`full-${idx}`} xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.933 5.787 1.4 8.167L12 18.898l-7.335 3.866 1.4-8.167L.132 9.21l8.2-1.192z"/>
          </svg>
        ))}
        {Array(emptyStars).fill().map((_, idx) => (
          <svg key={`empty-${idx}`} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.933 5.787 1.4 8.167L12 18.898l-7.335 3.866 1.4-8.167L.132 9.21l8.2-1.192z"/>
          </svg>
        ))}
      </>
    );
  };

  const handleBookNow = (car) => {
    navigate(`/book/Booking/${car._id}`, { state: { selectedCar: car } });
  };

  return (
    <div className="car-list-container">
      <div className="filter-container">
        <h3>Filter Cars</h3>
        <div className="filter-group">
          <label htmlFor="min-price">Minimum Price (INR/day)</label>
          <input
            id="min-price"
            type="number"
            name="minPrice"
            min="1000"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="max-price">Maximum Price (INR/day)</label>
          <input
            id="max-price"
            type="number"
            name="maxPrice"
            max="500000"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="seats-select">Seats</label>
          <select id="seats-select" name="seats" value={filters.seats} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="4">4 Seats</option>
            <option value="5">5 Seats</option>
            <option value="7">7 Seats</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="fuel-type-select">Fuel Type</label>
          <select id="fuel-type-select" name="fuelType" value={filters.fuelType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="transmission-select">Transmission</label>
          <select id="transmission-select" name="transmission" value={filters.transmission} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="min-speed">Minimum Speed (km/h)</label>
          <input
            id="min-speed"
            type="number"
            name="minSpeed"
            value={filters.minSpeed}
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="max-speed">Maximum Speed (km/h)</label>
          <input
            id="max-speed"
            type="number"
            name="maxSpeed"
            value={filters.maxSpeed}
            onChange={(e) => handleFilterChange(e)}
          />
        </div>
        <button className="filter-button" onClick={() => setFilters({ ...filters, availability: !filters.availability })}>
          {filters.availability ? 'Show All Cars' : 'Show Available Cars'}
        </button>
      </div>

      <div className="car-list">
        {filteredCars.map(car => (
          <div key={car._id} className="car-card">
            <img src={car.image} alt={car.name} className="car-image" />
            <div className="car-details">
              <h3>{car.name}</h3>
              <p>Model: {car.model}</p>
              <p>Price: {car.rentPerDay} INR/day</p>
              <p>Speed: {car.speed} km/h</p>
              <p>Seats: {car.seats}</p>
              <p>Transmission: {car.transmission}</p>
              <p>Fuel Type: {car.fuelType}</p>
              <p>Availability: {car.availability ? 'Available' : 'Not Available'}</p>
              <div className="star-rating">
                {renderStars(car.averageRating)}
              </div>
              <div className="car-actions">
                <button onClick={() => handleBookNow(car)} className="btn btn-primary">Book Now</button>
                <Link to={`/cars/${car._id}/reviews`} className="btn btn-secondary">View Reviews</Link>
                {auth && (auth.role === 'admin' || auth.role === 'seller') && (
                  <>
                    <button className="btn btn-edit" onClick={() => navigate(`/edit-car/${car._id}`)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(car._id)}>Delete</button>
                  </>
                )}
                {auth && auth.role === 'user' && (
                  <Link to={`/cars/${car._id}/add-review`} className="btn btn-review">Add Review</Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
