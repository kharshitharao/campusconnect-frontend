import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    year: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          department: formData.department,
          year: formData.year,
          password: formData.password
        }
      );

      console.log(response.data);

      setMessage("Account created successfully! 🎉");

      setFormData({
        fullName: "",
        email: "",
        department: "",
        year: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {

      console.error(error);

      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Unable to connect to server");
      }
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          Campus<span>Connect AI</span>
        </div>

        <h1>Create Account ✨</h1>

        <p className="register-subtitle">
          Join your campus community
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your university email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Department
              </option>

              <option>Artificial Intelligence</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Electronics</option>
              <option>Electrical</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Other</option>
            </select>

          </div>

          <div className="input-group">
            <label>Year</label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Year
              </option>

              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>

          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="register-submit"
          >
            Create Account
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p className="login-text">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>
  );
}

export default Register;