// import express from 'express';
// import { 
//     getDoctor, 
//     getAllDoctors, 
//     bookAppointment, 
//     getDoctorAppointments 
// } from '../controllers/doctorController.js';
// import userAuth from '../middleware/userAuth.js';

// const doctorRouter = express.Router();

// // Public routes
// doctorRouter.get('/', getAllDoctors);

// // Protected routes (assuming you'll have doctor authentication)
// doctorRouter.get('/profile', userAuth, getDoctor);
// doctorRouter.get('/appointments', userAuth, getDoctorAppointments);

// export default doctorRouter;