import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard";
import "./App.css";

function Home() {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          Campus<span>Connect AI</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#events">Events</a>
          <a href="#resources">Resources</a>

          <a href="/login">
            <button className="login-btn">Login</button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            🤖 AI-Powered Campus Platform
          </div>

          <h1>
            Your Campus.
            <br />
            <span>Connected.</span>
          </h1>

          <p>
            Discover campus events, learning resources, activities,
            and opportunities personalized for you with the power of AI.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Events
            </button>

            <button className="secondary-btn">
              🤖 Ask AI Assistant
            </button>
          </div>
        </div>

        {/* AI Card */}
        <div className="hero-card">
          <div className="ai-icon">🤖</div>

          <h2>Meet CampusConnect AI</h2>

          <p>
            Your intelligent campus assistant that helps you discover
            events, resources and opportunities based on your interests.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <h2>Everything You Need in One Place</h2>

        <p className="features-subtitle">
          A smarter way to experience your campus.
        </p>

        <div className="feature-container">

          <div className="feature-card">
            <div className="icon">📅</div>
            <h3>Campus Events</h3>
            <p>
              Discover workshops, competitions and seminars.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🤖</div>
            <h3>AI Recommendations</h3>
            <p>
              Get personalized event recommendations.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📚</div>
            <h3>Learning Resources</h3>
            <p>
              Find useful academic learning materials.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">💬</div>
            <h3>AI Assistant</h3>
            <p>
              Ask questions about campus activities.
            </p>
          </div>

        </div>
      </section>

      {/* Events Section */}
      <section className="info-section" id="events">
        <h2>Campus Events</h2>

        <p>
          Discover upcoming workshops, hackathons, competitions,
          seminars and student activities happening on campus.
        </p>
      </section>

      {/* Resources Section */}
      <section className="info-section" id="resources">
        <h2>Learning Resources</h2>

        <p>
          Access useful academic resources, study materials,
          notes and learning opportunities in one place.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2026 CampusConnect AI. Connecting students with opportunities.
        </p>
      </footer>
    </div>
  );
}

function App() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

<Route
  path="/login"
  element={<Login onLoginSuccess={setLoggedInUser} />}
/>

<Route path="/register" element={<Register />} />

<Route
  path="/dashboard"
  element={
    <Dashboard
      user={loggedInUser}
      onLogout={() => {
        setLoggedInUser(null);
        window.location.href = "/login";
      }}
    />
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
