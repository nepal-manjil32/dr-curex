import React from 'react';
import './Greeting.css'; // Create this CSS file

const Greeting = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes(); // Get minutes
  const formattedTime = `${hour}:${minutes < 10 ? '0' : ''}${minutes}`; // Format time

  let greeting = "";
  let icon = "";

  if (hour < 12) {
    greeting = "Good Morning";
    icon = "🌅"; // Sunrise
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    icon = "🌄"; // Afternoon Sun
  } else if (hour < 22) {
    greeting = "Good Evening";
    icon = "🌇"; // Sunset
  } else {
    greeting = "Good Night";
    icon = "🌆"; // Night City
  }

  return (
    <div className="greeting-container">
      <h4 className="greeting-text">
        {icon} {greeting}
      </h4>
      <p className="current-time">Current Time: {formattedTime}</p>
    </div>
  );
};

export default Greeting;
