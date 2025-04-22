import Doctor from '../models/doctorModel.js';

const getDoctor = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const doctor = await Doctor.findOne({doctorId});
        
        if (!doctor) {
            return res.status(404).json({ 
                success: false, 
                message: "Doctor not found" 
            });
        }
        
        // Return fields from our updated schema
        res.status(200).json({ 
            success: true, 
            doctorData: {
                _id: doctor._id,
                name: doctor.name,
                specialization: doctor.specialization,
                experience: doctor.experience,
                location: doctor.location,
                phone: doctor.phone,
                image: doctor.image,
                totalSlots: doctor.totalSlots,
                availableSlots: doctor.availableSlots,
                rating: doctor.rating,
                age: doctor.age,
                gender: doctor.gender,
                city: doctor.city,
                currentAvailableSlots: doctor.currentAvailableSlots
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Additional controller methods to support the appointment booking system
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}, '-appointments');
        
        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const bookAppointment = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { patientName, patientPhone, date, time } = req.body;
        
        // Find the doctor
        const doctor = await Doctor.findById(doctorId);
        
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        
        // Check if slot is already booked
        const isSlotBooked = doctor.appointments.some(appointment => {
            const appointmentDate = new Date(appointment.date).toDateString();
            const requestDate = new Date(date).toDateString();
            return appointmentDate === requestDate && appointment.time === time;
        });
        
        if (isSlotBooked) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already booked"
            });
        }
        
        // Add new appointment
        doctor.appointments.push({
            patientName,
            patientPhone,
            date: new Date(date),
            time
        });
        
        // Update available slots count
        doctor.availableSlots = doctor.totalSlots - doctor.appointments.length;
        
        // Save the doctor
        await doctor.save();
        
        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: doctor.appointments[doctor.appointments.length - 1]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getDoctorAppointments = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.user._id);
        
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        
        res.status(200).json({
            success: true,
            count: doctor.appointments.length,
            appointments: doctor.appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { getDoctor, getAllDoctors, bookAppointment, getDoctorAppointments };