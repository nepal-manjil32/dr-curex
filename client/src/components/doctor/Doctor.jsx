import React, { useState, useEffect, useContext } from "react";
import "./Doctor.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const Doctor = () => {
  // Context for backend communication
  const { doctorData, getDoctorData, backendUrl } = useContext(AppContext);

  // States for component
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);
  const [dates, setDates] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "2:00 PM",
    "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  // Initialize data
  useEffect(() => {
    // Generate next 7 days for selection
    const getNextSevenDays = () => {
      const dateArray = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        dateArray.push({
          date: date,
          dateString: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
        });
      }
      return dateArray;
    };

    setDates(getNextSevenDays());

    // Load doctors when component mounts
    fetchDoctors();
  }, []);

  // Fetch doctors using the context
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      await getDoctorData();
      setError(null);
    } catch (err) {
      setError('Failed to load doctors. Please try again later.');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Book appointment API call
  const bookAppointment = async (doctorId, appointmentData) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/user/doctors/${doctorId}/book`, 
        appointmentData,
        { withCredentials: true }
      );

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Failed to book appointment');
      }

      return data.appointment;
    } catch (err) {
      console.error('Error booking appointment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  const handleContinueToForm = () => {
    if (selectedDate && selectedTime) {
      setStep(3);
    }
  };

  const handleBackToList = () => {
    setStep(1);
    setSelectedDoctor(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingSuccess(false);
    // Refresh doctor list when going back to list
    fetchDoctors();
  };

  const handleBackToSchedule = () => {
    setStep(2);
    setBookingSuccess(false);
  };

  const handleBookAppointment = async () => {
    // if (!patientName || !patientPhone) return;

    try {
      // Prepare appointment data
      const appointmentData = {
        patientName,
        patientPhone,
        date: selectedDate.date.toISOString(),
        time: selectedTime
      };

      // Book the appointment via API
      await bookAppointment(selectedDoctor._id, appointmentData);

      // Refresh doctor data to get updated availability
      await getDoctorData();
      
      setBookingSuccess(true);
      setError(null);

      // Reset form fields
      setPatientName("");
      setPatientPhone("");
    } catch (err) {
      setError('Failed to book appointment. This time slot may be already booked.');
      console.error('Booking error:', err);
    }
  };

  // Check if a slot is already booked
  const isSlotBooked = (date, time) => {
    if (!selectedDoctor || !selectedDoctor.appointments) return false;

    return selectedDoctor.appointments.some(appointment => {
      const appointmentDate = new Date(appointment.date).toDateString();
      const slotDate = date.date.toDateString();
      return appointmentDate === slotDate && appointment.time === time;
    });
  };

  // Filter available times for the selected date
  const getAvailableTimes = () => {
    if (!selectedDate || !selectedDoctor) return [];

    return timeSlots.filter(time => !isSlotBooked(selectedDate, time));
  };

  // Render doctor list (Step 1)
  const renderDoctorList = () => {
    if (loading) {
      return <div className="loading-state">Loading doctors...</div>;
    }

    if (error) {
      return (
        <div className="error-state">
          {error}
          <button className="retry-button" onClick={fetchDoctors}>Retry</button>
        </div>
      );
    }

    if (!doctorData || doctorData.length === 0) {
      return <div className="no-data-state">No doctors available at the moment.</div>;
    }

    return (
      <div className="doctor-list">
        {doctorData.map(doctor => (
          <div key={doctor._id} className="doctor-card">
            <div className="doctor-info">
              <div className="doctor-avatar">
                <img src={doctor.image || "/api/placeholder/80/80"} alt={doctor.name} />
              </div>

              <div className="doctor-details">
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialization">{doctor.specialization}</p>

                <div className="doctor-metadata">
                  <div className="metadata-item">
                    <span className="icon">⭐</span>
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="metadata-item">
                    <span className="icon">📍</span>
                    <span>{doctor.location}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="icon">📞</span>
                    <span>{doctor.phone}</span>
                  </div>
                </div>

                <div className="doctor-footer">
                  <span className="availability-badge">
                    {doctor.availableSlots} slots available of {doctor.totalSlots || 12}
                  </span>
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`star ${star <= Math.floor(doctor.rating) ? 'filled' : ''}`}>★</span>
                    ))}
                    <span className="rating-value">{doctor.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="book-button"
              onClick={() => handleSelectDoctor(doctor)}
              disabled={doctor.currentAvailableSlots <= 0 || doctor.availableSlots <= 0}
            >
              {(doctor.currentAvailableSlots > 0 || doctor.availableSlots > 0) ? 'Book Appointment' : 'No Slots Available'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Render scheduling step (Step 2)
  const renderScheduling = () => {
    const availableTimes = getAvailableTimes();

    if (loading) {
      return <div className="loading-state">Loading schedule...</div>;
    }

    return (
      <div className="scheduling-container">
        <div className="scheduling-header">
          <button className="back-button" onClick={handleBackToList}>
            ← Back to Doctor List
          </button>
          <h2 className="section-heading">Schedule with {selectedDoctor.name}</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="scheduling-options">
          <div>
            <h3 className="subsection-heading">
              <span className="icon">📅</span> Select Date
            </h3>
            <div className="date-selector">
              {dates.map((date, index) => (
                <div
                  key={index}
                  className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                  onClick={() => handleSelectDate(date)}
                >
                  <div className="weekday">{date.weekday}</div>
                  <div className="date">{date.dateString}</div>
                </div>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div>
              <h3 className="subsection-heading">
                <span className="icon">🕒</span> Select Time
              </h3>
              {availableTimes.length > 0 ? (
                <div className="time-selector">
                  {availableTimes.map((time, index) => (
                    <div
                      key={index}
                      className={`time-option ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => handleSelectTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-slots-message">No available time slots for this date.</p>
              )}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            className="continue-button"
            onClick={handleContinueToForm}
            disabled={!selectedDate || !selectedTime}
          >
            Continue to Book
          </button>
        </div>
      </div>
    );
  };

  // Render patient info form (Step 3)
  const renderPatientForm = () => {
    if (bookingSuccess) {
      return (
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2 className="success-heading">Appointment Booked Successfully!</h2>
          <div className="booking-summary">
            <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
            <p><strong>Date:</strong> {selectedDate.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Patient:</strong> {patientName}</p>
          </div>
          <button className="book-another-button" onClick={handleBackToList}>
            Book Another Appointment
          </button>
        </div>
      );
    }

    return (
      <div className="form-container">
        <div className="form-header">
          <button className="back-button" onClick={handleBackToSchedule}>
            ← Back to Schedule
          </button>
          <h2 className="section-heading">Complete Your Booking</h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="appointment-summary">
          <h3 className="summary-heading">Appointment Details</h3>
          <div className="summary-grid">
            <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
            <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
            <p><strong>Date:</strong> {selectedDate.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
          </div>
        </div>

        <div className="patient-form">
          <h3 className="form-heading">Patient Information</h3>
  
          <button
            className="confirm-button"
            onClick={handleBookAppointment}
            // disabled={!patientName || !patientPhone || loading}
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="appointment-container">
      <div className="header">
        <h1 className="main-heading">Doctor Appointment Booking</h1>
        <p className="subheading">Book your appointment with our specialists</p>
      </div>

      <div className="progress-tracker">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Select Doctor</div>
        </div>
        <div className={`connector ${step >= 2 ? 'active' : ''}`} />
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Choose Schedule</div>
        </div>
        <div className={`connector ${step >= 3 ? 'active' : ''}`} />
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Patient Info</div>
        </div>
      </div>

      <div className="content-panel">
        {step === 1 && renderDoctorList()}
        {step === 2 && renderScheduling()}
        {step === 3 && renderPatientForm()}
      </div>
    </div>
  );
};

export default Doctor;

// const Doctor = () => {
//   const { doctorData, getDoctorData } = useContext(AppContext);

//   useEffect(() => {
//     getDoctorData();
//   }, [getDoctorData]);

//   if (!doctorData || doctorData.length === 0) {
//     return <p>No doctors found.</p>;
//   }

//   return (
//     <div className="doctor-list">
//       {doctorData.map((doctor) => (
//         <div className="doctor-card" key={doctor._id}>
//           <img src={doctor.image} alt={doctor.name} />
//           <h3>{doctor.name}</h3>
//           <p><strong>Gender:</strong> {doctor.gender}</p>
//           <p><strong>Available Slots:</strong> {doctor.availableSlots}</p>
//           <p><strong>Experience:</strong> {doctor.experience}</p>
//           {/* Example of manipulating data: */}
//           <p>
//             <strong>Status:</strong>{" "}
//             {doctor.availableSlots > 0 ? "Available" : "Fully Booked"}
//           </p>
//           {/* Add more fields as needed */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Doctor;