import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import Card from "../../components/card/Card.jsx";
import remedies from "../../assets/icons/remedies.png";
import bmi from "../../assets/icons/bmi.png";
import hospital from "../../assets/icons/nearby-hospital.png";
import doctor from "../../assets/icons/appointment.png";
import ambulance from "../../assets/icons/ambulance.png";
import bp from "../../assets/icons/bp-check.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import News from "../../components/news/News.jsx";
import userImg from "../../assets/demo-user.png";
import Appointment from "../../components/appointment/Appointment.jsx";
import Profile from "../../components/profile/Profile.jsx";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { backendUrl, userData, getUserData, logout } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      await getUserData();
      setLoading(false);
    };
    fetchUser();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hour = new Date().getHours();

  if (loading) {
    return <div className="loading">Loading your dashboard...</div>;
  }

  if (!userData) {
    return (
      <div className="error">
        <p>❌ Failed to load user data. Please log in again.</p>
        <Link to="/" className="log-out-btn">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="leftComponent">
        <div className="img-div">
          <img src={logo} alt="logo" />
        </div>

        <div className="profile">
          <Profile
            imgsrc={userImg}
            name={userData.name}
            age={userData.age}
            blood={userData.bloodGroup}
            city={userData.city}
            state={userData.stateAddress}
          />
        </div>

        <div className="log-out">
          <Link to="/" className="log-out-btn" onClick={logout}>
            Log Out
          </Link>
        </div>
      </div>

      <div className="middleComponent">
        <div className="top">
          <h1>Health Overview</h1>
          <h5>{currentDate}</h5>
          <div>
            {hour < 12 ? (
              <h6>🌅 Good Morning</h6>
            ) : hour < 18 ? (
              <h6>🌄 Good Afternoon</h6>
            ) : hour < 22 ? (
              <h6>🌇 Good Evening</h6>
            ) : (
              <h6>🌆 Good Night</h6>
            )}
          </div>
        </div>

        <div className="middle">
          <Card name="Remedies" imageSrc={remedies} linkTO="/dashboard/remedies" />
          <Card name="Calculate BMI" imageSrc={bmi} linkTO="/dashboard/bmi" />
          <Card name="Nearby Hospital" imageSrc={hospital} linkTO="/dashboard/nearby-hospitals" />
          <Card name="Schedule" imageSrc={doctor} linkTO="/dashboard/appointment" />
          <Card name="Book Ambulance" imageSrc={ambulance} linkTO="/dashboard/ambulance" />
          <Card name="Coming Soon" imageSrc={bp} linkTO="/dashboard/soon" />
        </div>

        <div className="lower">
          <p className="lower-title">Upcoming Appointments</p>
          <div className="appoint">
            <Appointment
              date="Mon, Apr 21"
              time="12:00 PM"
              doctor="Dr. Stephen Hawking"
              location="London Road, London"
              desc="Piles"
            />
            <Appointment
              date="Mon, Apr 21"
              time="12:00 PM"
              doctor="Dr. Donald Trump"
              desc="Piles"
              location="Washington DC, Columbia"
              id="APT-00123"
            />
            <Appointment
              date="Mon, Apr 21"
              time="12:00 PM"
              doctor="Dr. Vladimir Putin"
              desc="Piles"
              location="Kremlin, Saint Petersburg"
              id="APT-00124"
            />
          </div>
        </div>
      </div>

      <div className="rightComponent">
        <div className="news" style={{ overflowY: "auto" }}>
          <News />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
