import mongoose from "mongoose";

// Schema for appointments that will be embedded in the doctor document
const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  booked: { type: Date, default: Date.now }
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, default: "/api/placeholder/80/80" },
  totalSlots: { type: Number, default: 8 },
  availableSlots: { type: Number, default: 8 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  appointments: [appointmentSchema],
  
  // Including the original fields as well
  age: { type: Number },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  city: { type: String },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create a virtual field to calculate available slots
doctorSchema.virtual('currentAvailableSlots').get(function() {
  return this.totalSlots - this.appointments.length;
});

// Ensure virtual fields are included when converting to JSON
doctorSchema.set('toJSON', { virtuals: true });
doctorSchema.set('toObject', { virtuals: true });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;