import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
  });

  const [bmiData, setBmiData] = useState({
    weight: "",
    height: "",
    bmi: null,
    status: "",
  });

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchedUserInfo = {
      name: "Manjil Nepal",
      age: "21",
      gender: "Male",
      country: "Nepal",
    };

    const fetchedAppointments = [
      { date: "April 20, 2025", description: "Consultation with Dr. Manjil" },
      { date: "May 5, 2025", description: "Follow-up with Dr. Sharma" },
    ];

    setUserInfo(fetchedUserInfo);
    setAppointments(fetchedAppointments);
  }, []);

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100;

    if (weight && height) {
      const bmi = (weight / (height * height)).toFixed(2);
      let status = "";

      if (bmi < 18.5) {
        status = "Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Normal weight";
      } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Overweight";
      } else {
        status = "Obese";
      }

      setBmiData({ ...bmiData, bmi, status });
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container fluid className="dashboard">
      <Row>
        <Col xs={1} className="sidebar d-flex flex-column align-items-center py-3">
          <div className="logo mb-4">
            <img src="src/assets/logo.png" alt="logo" />
            <p>Dr.CureX</p>
          </div>
          <div className="sidebar-item">🏠</div>
          <div className="sidebar-item">➖</div>
          <div className="sidebar-item">🔄</div>
          <div className="sidebar-item">⚙️</div>
        </Col>

        <Col xs={8} className="main-content py-3">
          <header className="text-center mb-4">
            <h2>Health Overview</h2>
            <p>{currentDate}</p>
          </header>

          <Row className="g-3">
            {[
              { icon: "src/assets/icons/remedies.png", title: "Remedies", buttonText: "Find", path: "/remedies" },
              { icon: "src/assets/icons/report-analysis.png", title: "Report Analysis", buttonText: "Analyze", path: "/report" },
              { icon: "src/assets/icons/nearby-hospital.png", title: "Nearby Hospital", buttonText: "Search", path: "/hospital" },
              { icon: "src/assets/icons/appointment.png", title: "Appointment", buttonText: "Book", path: "/appointment" },
              { icon: "src/assets/icons/ambulance.png", title: "Ambulance", buttonText: "Call", path: "/ambulance" },
              { icon: "src/assets/icons/bp-check.png", title: "BP Check", buttonText: "Coming Soon", path: "/bpcheck" },
            ].map((card, index) => (
              <Col key={index} md={4}>
                <Card className="text-center shadow-sm">
                  <Card.Img variant="top" src={card.icon} alt={card.title} className="card-icon mx-auto mt-3" />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Button
                      variant="success"
                      onClick={() => handleNavigation(card.path)}
                      disabled={card.path === "#"}
                    >
                      {card.buttonText}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <section className="mt-4 bg-light py-3 rounded shadow-sm">
            <h5 className="text-center">Upcoming Appointments</h5>
            {appointments.length > 0 ? (
              <ul className="list-unstyled text-center">
                {appointments.map((appointment, index) => (
                  <li key={index}>
                    <strong>{appointment.date}</strong>: {appointment.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-muted">No upcoming appointments.</p>
            )}
          </section>
        </Col>

        <Col xs={3} className="profile-section p-3 bg-light rounded shadow-sm">
          <div className="bmi-calculator mb-4">
            <h5>BMI CALCULATOR</h5>
            <Form>
              <Form.Group controlId="weightInput">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter weight"
                  value={bmiData.weight}
                  onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="heightInput" className="mt-2">
                <Form.Label>Height (cm)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter height"
                  value={bmiData.height}
                  onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" className="mt-3" onClick={calculateBMI}>
                Calculate BMI
              </Button>

              {bmiData.bmi && (
                <>
                  <p className="mt-3">Your BMI is: {bmiData.bmi}</p>
                  <p>Status: {bmiData.status}</p>
                </>
              )}
            </Form>
          </div>

          <div className="profile-details text-center">
            <img src="src/assets/icons/profile-placeholder.png" alt="Profile" className="profile-pic rounded-circle mb-3" />
            <h6>{userInfo.name}</h6>
            <p>Age: {userInfo.age}</p>
            <p>Gender: {userInfo.gender}</p>
            <p>Country: {userInfo.country}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
