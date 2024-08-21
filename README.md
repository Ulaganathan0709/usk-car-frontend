# Usk Rental Car Application - Frontend

Usk Rental Car is a web application that allows users to browse, book, and review rental cars. The frontend of this application is built with React.js and utilizes Vite for fast development and build times. 

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Redirects](#redirects)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration with JWT.
- **Car Listings:** View and filter cars based on various criteria.
- **Booking System:** Users can book cars and view their bookings.
- **Review System:** Users can add, edit, and view reviews for cars.
- **Admin/Seller Dashboard:** Manage cars and bookings.
- **Payment Integration:** Stripe is used for secure payments.
- **Responsive Design:** Fully responsive for mobile and desktop devices.

## Technology Stack

- **React.js** - JavaScript library for building user interfaces.
- **Vite** - Fast development and build tool for modern web projects.
- **CSS** - Styling the application.
- **Stripe** - Payment processing integration.

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Clone the Repository

```bash
git clone https://bitbucket.org/yourusername/usk-rental-car-app.git
cd usk-rental-car-app

```

## Usage

- **Login/Register:** Users can sign up or log in to access their dashboard.
- **Browse Cars:** Users can browse and filter through the available cars.
- **Booking:** After selecting a car, users can book it by providing the required details.
- **Payment:** Stripe is integrated for secure payments.
- **Manage Cars:** Admin and sellers can manage car listings from their dashboard.
- **View Bookings:** Users can view and cancel their bookings if needed.
- **Reviews:** Users can leave reviews for the cars they have booked.

## Admin Login
 ```
 Admin mailID: zoomcar996@gmail.com
 Admin password:: Admin@1994

 ```

## Deployment

### Netlify

The frontend is deployed using Netlify. Visit the live application at:

[Netlify URL](https://usk-rental-car.netlify.app)

### Deployment Steps

1. Push your latest changes to the main branch.
2. Netlify will automatically build and deploy the app.

## Routes

- `/`: Home page
- `/login`: User login
- `/register`: User registration
- `/forgotpassword`: Request password reset
- `/resetpassword/:token`: Reset password form
- `/profile`: User profile (Protected)
- `/cars`: List of cars
- `/cars/:id/reviews`: View car reviews
- `/cars/:id/add-review`: Add review for a car
- `/add-car`: Add new car (Admin/Seller)
- `/edit-car/:id`: Edit car details (Admin/Seller)
- `/admin`: Admin dashboard (Protected)
- `/book/booking/:carId`: Book a car
- `/bookings`: View bookings (Protected)
- `/payment`: Payment page (Protected)
- `/success`: Payment success page
- `/Refund`: Refund page after cancellation
- `/failed`: Payment failure page

## License

This project is licensed under the MIT License.

## Setup Environment

### Environment Variables

Create a `.env` file in the root directory with the following environment variables:

```env
VITE_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_KEY=your_stripe_public_key
REACT_APP_BACKEND_URL=http://localhost:5000
