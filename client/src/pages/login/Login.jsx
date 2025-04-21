import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { AppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import doctor from "../../assets/dr.webp";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsUserLoggedIn } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [stateAddress, setStateAddress] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          age,
          gender,
          bloodGroup,
          city,
          stateAddress,
          email,
          password,
        });

        if (data.success) {
          toast.success("Successfully registered");
          setIsUserLoggedIn(true);
          console.log("Navigation to dashboard after signup");
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          toast.success("Logged in successfully");
          setIsUserLoggedIn(true);
          console.log("Navigation to dashboard after login");
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.error("Login/Signup error:", error);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row>
        <Col md={6} className="login-left">
          <img
            src={doctor}
            alt="Doctor Illustration"
            className="doctor-image"
          />
        </Col>

        <Col md={6} className="login-right">
          <div className="form-container">
            <h2>{state === "Sign Up" ? "Sign Up" : "Login"}</h2>
            <Form onSubmit={onSubmitHandler}>
              {state === "Sign Up" && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {state === "Sign Up" && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {state === "Sign Up" && (
                <Form.Group className="mb-3">
                  <Form.Select
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              )}

              {state === "Sign Up" && (
                <Form.Group className="mb-3">
                  <Form.Select
                    name="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select Blood Group
                    </option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Form.Select>
                </Form.Group>
              )}

              {state === "Sign Up" && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {state === "Sign Up" && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="State"
                    value={stateAddress}
                    onChange={(e) => setStateAddress(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="login-button-div">
                <Button type="submit" className="login-button">
                  {state === "Sign Up" ? "Sign Up" : "Login"}
                </Button>
              </div>

              <div className="toggle-link">
                <p>
                  {state === "Sign Up"
                    ? "Already have an account? "
                    : "Don't have an account? "}
                  <span
                    onClick={() =>
                      setState(state === "Sign Up" ? "Login" : "Sign Up")
                    }
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    {state === "Sign Up" ? "Login" : "Sign Up"}
                  </span>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
