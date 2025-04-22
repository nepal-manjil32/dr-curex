import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'completed', 'cancelled'],
    default: 'confirmed'
  },
  bookedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true
  },
  city: { type: String, required: true },
  stateAddress: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appointments: [appointmentSchema] // Add appointments array to store user bookings
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;