import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Profile from './components/auth/Profile';
import CarList from './components/car/CarList';
import AdminDashboard from './components/auth/AdminDashboard';
import Review from './components/Review/Review';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AddCar from './components/car/AddCar';
import EditCar from './components/car/EditCar';
import Booking from './components/Booking/Booking';
import ViewBooking from './components/Booking/ViewBooking';
import Payment from './components/payment/Payment';
import Success from './components/payment/Success';
import AddReview from './components/Review/AddReview';
import Failed from './components/payment/Failed';
import Refund from './components/payment/Refund';
import EditReview from './components/Review/EditReview';
import NotFound from './components/NotFound';
import ConfirmEmail from './components/auth/ConfirmEmail';
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/add-car" element={<ProtectedRoute roles={['admin', 'seller']}><AddCar /></ProtectedRoute>} />
        <Route path="/edit-car/:id" element={<ProtectedRoute roles={['admin', 'seller']}><EditCar /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/cars/:id/reviews" element={<Review />} />
        <Route path="/cars/:id/add-review" element={<AddReview />} />
        <Route path="/cars/:id/edit-review" element={<ProtectedRoute><EditReview /></ProtectedRoute>} />
        <Route path="/book/booking/:carId" element={<Booking />} />
        <Route path="/bookings" element={<ProtectedRoute><ViewBooking /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/success" element={<Success />} />
        <Route path="/Refund" element={<Refund />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/confirm/:token" element={<ConfirmEmail />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
