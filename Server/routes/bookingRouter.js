import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {checkAvailabilityAPI, createBooking, getHotelBookings, getUserBooking} from '../controllers/bookingController.js';  

const bookingRouter = express.Router();

bookingRouter.post('/check-availability',checkAvailabilityAPI)
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/hotel', protect, getHotelBookings);       
bookingRouter.get('/user', protect, getUserBooking);

export default bookingRouter;