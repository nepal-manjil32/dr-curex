import express from 'express';
import {getDoctor, getAllDoctors, bookAppointment, getDoctorAppointments} from '../controllers/doctorController.js';
import userAuth from '../middleware/userAuth.js';

const doctorRouter = express.Router();

doctorRouter.post('/data',userAuth, getDoctor)
doctorRouter.get('/all',userAuth, getAllDoctors)
doctorRouter.post('/book',userAuth, bookAppointment)
doctorRouter.get('/appointments',userAuth, getDoctorAppointments)
export default doctorRouter;