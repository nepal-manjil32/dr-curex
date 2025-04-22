import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import transporter from '../config/nodemailer.js';
import userModel from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import mongoose from 'mongoose';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id, 'name email city stateAddress gender bloodGroup age');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user) {
            res.status(200).json({ success: true, userData: { _id: user._id, name: user.name, email: user.email, city:user.city, stateAddress:user.stateAddress, gender:user.gender, bloodGroup:user.bloodGroup, age:user.age } });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Controller for student login
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist!" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password!" })
        }

        //JWT token
        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        res.status(200).json({ success: true, message: "User logged in successfully!", token })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

//Controller for student registration
const registerUser = async (req, res) => {
    try {

        const { name, age, gender, bloodGroup, city, stateAddress, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists!" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
            return res.status(400).json({ success: false, message: "Please enter a strong password with at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol" })
        }

        const newUser = new userModel({
            name,
            age, 
            gender, 
            bloodGroup, 
            city, 
            stateAddress,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        })

        //Sending welcome email
        const mailOptions = {
            from: "nepalmanjil@gmail.com",
            to: email,
            subject: "Welcome to DrCureX – Your Health Companion",
            text: `
            
        Hi there,

        Thank you for signing up with DrCureX – your trusted AI-powered health assistant. We're excited to have you on board!

        With DrCureX, you can get intelligent insights, reliable health information, and 24/7 support – all tailored to your well-being.

        Stay healthy,
        The DrCureX Team`,
        };
        await transporter.sendMail(mailOptions);


        res.status(201).json({ success: true, message: "User registered successfully!", token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message })
    }
}

//Controller for user logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.status(200).json({ success: true, message: "User logged out successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// NEW FUNCTIONS FOR APPOINTMENT BOOKING

// Get all doctors
// Modified getAllDoctors function
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).lean().select('-appointments');
        
        if (!doctors) {
            return res.status(200).json({
                success: true,
                count: 0,
                doctors: []
            });
        }
        
        res.status(200).json({
            success: true,
            count: doctors.length,
            doctors
        });
    } catch (error) {
        console.error("Error in getAllDoctors:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error retrieving doctors"
        });
    }
};

// Get a specific doctor by ID
const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid doctor ID"
            });
        }

        const doctor = await Doctor.findById(doctorId, '-appointments').lean();

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        console.log("Doctor found:", doctor);

        res.status(200).json({
            success: true,
            doctor
        });
    } catch (error) {
        console.error("Error in getDoctorById:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error retrieving doctor"
        });
    }
};

// Get available slots for a specific doctor on a given date
const getDoctorAvailableSlots = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { date } = req.query;
        
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        
        // Default time slots (9 AM to 5 PM)
        const allTimeSlots = [
            "09:00 AM", "10:00 AM", "11:00 AM", 
            "12:00 PM", "01:00 PM", "02:00 PM", 
            "03:00 PM", "04:00 PM", "05:00 PM"
        ];
        
        // Filter out booked slots for the requested date
        const requestDate = new Date(date).toDateString();
        const bookedSlots = doctor.appointments
            .filter(appointment => new Date(appointment.date).toDateString() === requestDate)
            .map(appointment => appointment.time);
        
        // Calculate available slots
        const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
        
        res.status(200).json({
            success: true,
            doctorId: doctor._id,
            doctorName: doctor.name,
            date: requestDate,
            availableSlots
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Book an appointment with a doctor
const bookAppointment = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const userId = req.user._id;
        const { date, time } = req.body;
        
        // Find the user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Find the doctor
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }
        
        // Validate the date
        const appointmentDate = new Date(date);
        const today = new Date();
        
        if (appointmentDate < today && appointmentDate.toDateString() !== today.toDateString()) {
            return res.status(400).json({
                success: false,
                message: "Cannot book appointments for past dates"
            });
        }
        
        // Check if the slot is already booked
        const isSlotBooked = doctor.appointments.some(appointment => {
            const appDate = new Date(appointment.date).toDateString();
            const reqDate = appointmentDate.toDateString();
            return appDate === reqDate && appointment.time === time;
        });
        
        if (isSlotBooked) {
            return res.status(400).json({
                success: false,
                message: "This time slot is already booked"
            });
        }
        
        // Add appointment to doctor's appointments
        doctor.appointments.push({
            patientName: user.name,
            patientPhone: req.body.phone || "Not provided",
            date: appointmentDate,
            time
        });
        
        // Update available slots count
        doctor.availableSlots = doctor.totalSlots - doctor.appointments.length;
        
        // Add appointment to user's appointments
        user.appointments.push({
            doctorId,
            date: appointmentDate,
            time,
            status: "confirmed"
        });
        
        // Save both doctor and user
        await Promise.all([doctor.save(), user.save()]);
        
        // Send confirmation email
        try {
            const mailOptions = {
                from: "nepalmanjil@gmail.com",
                to: user.email,
                subject: "Appointment Confirmation - DrCureX",
                text: `
                Hi ${user.name},

                Your appointment with Dr. ${doctor.name} has been confirmed.
                
                Details:
                Date: ${appointmentDate.toDateString()}
                Time: ${time}
                
                Please arrive 15 minutes before your scheduled appointment.
                
                Thank you for choosing DrCureX.
                `
            };
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // Continue with the response even if email fails
        }
        
        res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: {
                doctor: {
                    _id: doctor._id,
                    name: doctor.name,
                    specialization: doctor.specialization
                },
                date: appointmentDate,
                time,
                status: "confirmed"
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all user's appointments
const getUserAppointments = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const user = await userModel.findById(userId).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Populate doctor details for each appointment
        const populatedUser = await userModel.findById(userId).populate({
            path: 'appointments.doctorId',
            select: 'name specialization image location'
        }).lean();
        
        res.status(200).json({
            success: true,
            count: populatedUser.appointments.length,
            appointments: populatedUser.appointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const userId = req.user._id;
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Find the appointment in user's appointments
        const appointmentIndex = user.appointments.findIndex(
            appointment => appointment._id.toString() === appointmentId
        );
        
        if (appointmentIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }
        
        const appointment = user.appointments[appointmentIndex];
        
        // Update appointment status to cancelled
        user.appointments[appointmentIndex].status = "cancelled";
        
        // Also remove from doctor's appointments
        const doctor = await Doctor.findById(appointment.doctorId);
        if (doctor) {
            const doctorAppointmentIndex = doctor.appointments.findIndex(
                docAppointment => 
                    new Date(docAppointment.date).toDateString() === new Date(appointment.date).toDateString() &&
                    docAppointment.time === appointment.time
            );
            
            if (doctorAppointmentIndex !== -1) {
                doctor.appointments.splice(doctorAppointmentIndex, 1);
                doctor.availableSlots = doctor.totalSlots - doctor.appointments.length;
                await doctor.save();
            }
        }
        
        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Appointment cancelled successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
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
};