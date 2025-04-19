import React from 'react'
import './Dashboard.css'
import Card from '../../components/card/Card.jsx'
import remedies from '../../assets/icons/remedies.png'
import bmi from '../../assets/icons/bmi.png'
import hospital from '../../assets/icons/nearby-hospital.png'
import doctor from '../../assets/icons/appointment.png'
import ambulance from '../../assets/icons/ambulance.png'
import bp from '../../assets/icons/bp-check.png'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import News from '../../components/news/News.jsx'

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Extract the current hour
  const hour = new Date().getHours();

  return (
    <div className='dashboard'>
      <div className="leftComponent">
        <div className='img-div'><img src={logo} alt="logo" /></div>
        <div className='side-bar'>
          <Link to="/shsh" className='link-img'><img src="https://cdn-icons-png.flaticon.com/128/484/484562.png" alt="" /></Link>
          <Link to="/" className='link-img'><img src="https://cdn-icons-png.flaticon.com/128/15527/15527278.png" alt="" /></Link>
        </div>
      </div>

      <div className="middleComponent">

        <div className="top">
          <div>
            <h1>Health Overview</h1>
            <h5>{currentDate}</h5>
          </div>
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
          <Card 
            name="Remedies"
            imageSrc = {remedies}
            linkTO = "/dashboard/remedies"
          />
          <Card 
            name="Calculate BMI"
            imageSrc = {bmi}
            linkTO = "/dashboard/bmi"
          />
          <Card 
            name="Nearby Hospital"
            imageSrc = {hospital}
            linkTO = "/dashboard/remedies"
          />
          <Card 
            name="Schedule"
            imageSrc = {doctor}
            linkTO = "/dashboard/remedies"
          />
          <Card 
            name="Book Ambulance"
            imageSrc = {ambulance}
            linkTO = "/dashboard/remedies"
          />
          <Card 
            name="Coming Soon"
            imageSrc = {bp}
            linkTO = "/dashboard/remedies"
          />
        </div>

        <div className="lower">

        </div>
      </div>

      <div className="rightComponent">
          {/* <div className="profile"></div> */}
          <div className="news" style={{overflowY: 'auto' }}>
            <News />
          </div>
      </div>

    </div>
  )
}

export default Dashboard
