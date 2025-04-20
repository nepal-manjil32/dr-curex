import React from 'react';
import './Appointment.css';

const Appointment = (props) => {
  const { date, time, doctor, desc } = props;

  return (
    <div className="appointment-card">
        <div className="appointment-datetime">
          <div className="appointment-date">{date}</div>
          <div className="appointment-time">{time}</div>
        </div>
        <div className="appointment-info">
          <p className="appointment-name">{doctor}</p>
          <p className="appointment-desc">{desc}</p>
        </div>
      </div>
  );
};

export default Appointment;
