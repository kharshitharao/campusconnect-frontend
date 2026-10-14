
import { useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:8080/api/events";

function formatEventDate(value) {
  if (value == null || value === "") {
    return "Date to be announced";
  }

  let date;

  if (Array.isArray(value)) {
    const [year, month, day, hour = 0, minute = 0, second = 0] = value;
    date = new Date(year, month - 1, day, hour, minute, second);
  } else if (typeof value === "string") {
    date = new Date(value);
  } else {
    return "Date unavailable";
  }

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString("en-IN");
}



export default function Dashboard({ user: appUser, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user || appUser || {};

const [events, setEvents] = useState([]);
const [eventTitle, setEventTitle] = useState("");
const [eventDescription, setEventDescription] = useState("");
const [eventDate, setEventDate] = useState("");
const [eventLocation, setEventLocation] = useState("");
const [eventOrganizer, setEventOrganizer] = useState("");
const [eventMessage, setEventMessage] = useState("");
const [savingEvent, setSavingEvent] = useState(false);

useEffect(() => {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) throw new Error("Could not load events");
      return response.json();
    })
    .then((data) => setEvents(data))
    .catch((error) => console.error("Events loading error:", error));
}, []);

async function handleAddEvent(e) {
  e.preventDefault();
  setSavingEvent(true);
  setEventMessage("");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: eventTitle,
        description: eventDescription,
        eventDate: eventDate || null,
        location: eventLocation,
        organizer: eventOrganizer
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not add event");
    }

    setEvents((previous) => [...previous, data]);
    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setEventLocation("");
    setEventOrganizer("");
    setEventMessage("Event added successfully!");
  } catch (error) {
    setEventMessage(error.message || "Unable to connect to the server.");
  } finally {
    setSavingEvent(false);
  }
}

  const name =
    user.fullName || user.full_name || user.name || "Student";

  const department = user.department || "Artificial Intelligence";
  const year = user.year || "3rd Year";

  function logout() {
    if (onLogout) {
      onLogout();
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="cc-dashboard">
      <aside className="cc-sidebar">
        <h2 className="cc-logo">Campus<span>Connect AI</span></h2>

        <p className="cc-menu-label">MENU</p>
        <a className="cc-nav active" href="#overview">🏠 Overview</a>
        <a className="cc-nav" href="#events">📅 Campus Events</a>
        <a className="cc-nav" href="#announcements">📢 Announcements</a>
        <a className="cc-nav" href="#resources">📚 Learning Resources</a>
        <a className="cc-nav" href="#assistant">🤖 AI Assistant</a>

        <div className="cc-sidebar-bottom">
          <button className="cc-logout" onClick={logout}>↪ Logout</button>
        </div>
      </aside>

      <main className="cc-main" id="overview">
        <header className="cc-topbar">
          <div>
            <p className="cc-muted">STUDENT PORTAL</p>
            <h2>Dashboard</h2>
          </div>
          <div className="cc-user-chip">
            <div className="cc-avatar">{name.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{name}</strong>
              <p>{user.role || "STUDENT"}</p>
            </div>
          </div>
        </header>

        <section className="cc-welcome">
          <div>
            <p>YOUR CAMPUS, CONNECTED</p>
            <h1>Welcome back, {name}! 👋</h1>
            <p>Stay updated, explore opportunities, and make campus life easier.</p>
          </div>
          <div className="cc-welcome-icon">🎓</div>
        </section>

        <section className="cc-stats">
          <article className="cc-stat">
            <span>👤</span>
            <p>Department</p>
            <h3>{department}</h3>
          </article>
          <article className="cc-stat">
            <span>🎓</span>
            <p>Academic Year</p>
            <h3>{year}</h3>
          </article>
          <article className="cc-stat">
            <span>✉️</span>
            <p>Registered Email</p>
            <h3 className="cc-email">{user.email || "Not available"}</h3>
          </article>
        </section>

        <section className="cc-content-grid">
<article className="cc-panel" id="events">
  <div className="cc-panel-heading">
    <h2>Campus Events</h2>
    <span>{events.length} events</span>
  </div>

  <form className="cc-event-form" onSubmit={handleAddEvent}>
    <h3>Add a Campus Event</h3>

    <input
      type="text"
      placeholder="Event title"
      value={eventTitle}
      onChange={(e) => setEventTitle(e.target.value)}
      required
    />

    <textarea
      placeholder="Event description"
      value={eventDescription}
      onChange={(e) => setEventDescription(e.target.value)}
      rows="3"
    />

    <label>Event date and time</label>
    <input
      type="datetime-local"
      value={eventDate}
      onChange={(e) => setEventDate(e.target.value)}
    />

    <input
      type="text"
      placeholder="Venue / location"
      value={eventLocation}
      onChange={(e) => setEventLocation(e.target.value)}
    />

    <input
      type="text"
      placeholder="Organiser name"
      value={eventOrganizer}
      onChange={(e) => setEventOrganizer(e.target.value)}
    />

    <button type="submit" disabled={savingEvent}>
      {savingEvent ? "Saving..." : "＋ Add Event"}
    </button>

    {eventMessage && <p>{eventMessage}</p>}
  </form>

  <div className="cc-event-list">
    <h3>Upcoming Campus Events</h3>

    {events.length === 0 ? (
      <p>No events have been added yet.</p>
    ) : (
      events.map((item) => (
        <div className="cc-event-item" key={item.id}>
          <div className="cc-event-date">📅</div>

          <div>
            <strong>{item.title}</strong>

 
<p>{formatEventDate(item.eventDate)}</p>

            {item.location && <p>📍 {item.location}</p>}
            {item.description && <p>{item.description}</p>}
            {item.organizer && <p>Organiser: {item.organizer}</p>}
          </div>
        </div>
      ))
    )}
  </div>
</article>

          <article className="cc-panel" id="announcements">
            <div className="cc-panel-heading">
              <h2>Announcements</h2>
              <span>Updates</span>
            </div>
            <div className="cc-announcement">
              <span className="cc-dot"></span>
              <div>
                <strong>Welcome to CampusConnect AI</strong>
                <p>Your central space for campus information.</p>
              </div>
            </div>
            <div className="cc-announcement">
              <span className="cc-dot purple"></span>
              <div>
                <strong>Stay connected</strong>
                <p>Check back for university announcements.</p>
              </div>
            </div>
          </article>

          <article className="cc-panel" id="resources">
            <h2>Learning Resources</h2>
            <div className="cc-resource-list">
              <div className="cc-resource-icon">📘</div>
              <div>
                <strong>Study Materials</strong>
                <p>Notes and subject resources</p>
              </div>
            </div>
            <div className="cc-resource-list">
              <div className="cc-resource-icon">💻</div>
              <div>
                <strong>Technical Learning</strong>
                <p>Programming and AI learning</p>
              </div>
            </div>
          </article>

          <article className="cc-ai-panel" id="assistant">
            <div className="cc-ai-icon">✦</div>
            <p className="cc-ai-label">YOUR CAMPUS COMPANION</p>
            <h2>Meet your AI Assistant</h2>
            <p>Get help exploring campus resources and finding information more easily.</p>
            <button onClick={() => alert("AI Assistant integration is coming next!")}>
              Explore AI Assistant →
            </button>
          </article>
        </section>

        <footer className="cc-footer">
          CampusConnect AI · Connecting students, opportunities, and ideas.
        </footer>
      </main>
    </div>
  );
}
