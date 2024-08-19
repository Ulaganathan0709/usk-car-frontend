import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`);
                setCar(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCar();
    }, [id]);

    if (!car) {
        return <p>Loading...</p>;
    }

    return (
        <div className="car-details">
            <img src={car.imageUrl} alt={car.name} />
            <h2>{car.name}</h2>
            <p>{car.category}</p>
            <p>{car.pricePerDay} per day</p>
        </div>
    );
};

export default CarDetails;
