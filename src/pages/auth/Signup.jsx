import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <Container fluid className="signup-container">
      <Row>
        <Col md={6} className="signup-left">
          <img
            src="src/assets/dr.webp"
            alt="Doctor Illustration"
            className="doctor-image"
          />
        </Col>

        <Col md={6} className="signup-right">
          <div className="form-container">
            <div className="signup-title">
              <h2>Signup</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFullName" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDOB" className="mb-3">
                <Form.Control
                  type="date"
                  placeholder="Date of birth (mm/dd/yyyy)"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGender" className="mb-3">
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formCountry" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <div className="submit-button-div">
                <Button
                  type="submit"
                  variant="warning"
                  className="signup-button w-100"
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
