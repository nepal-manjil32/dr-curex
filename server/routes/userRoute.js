import express from 'express';
import {
    getUser, 
    loginUser, 
    registerUser, 
    logout,
    getAllDoctors,
    getDoctorById,
    getDoctorAvailableSlots,
    bookAppointment,
    getUserAppointments,
    cancelAppointment
} from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

// Existing routes
userRouter.get('/data', userAuth, getUser);
userRouter.post('/register', registerUser); // Note: there's a typo in "resister" vs "register"
userRouter.post('/login', loginUser);
userRouter.post('/logout', userAuth, logout);

// Public doctor routes
userRouter.get('/doctors', getAllDoctors);
userRouter.get('/doctors/:doctorId', getDoctorById);
userRouter.get('/doctors/:doctorId/slots', getDoctorAvailableSlots);

// Protected appointment routes
userRouter.post('/doctors/:doctorId/book', userAuth, bookAppointment);
userRouter.get('/appointments', userAuth, getUserAppointments);
userRouter.patch('/appointments/:appointmentId/cancel', userAuth, cancelAppointment);

export default userRouter;