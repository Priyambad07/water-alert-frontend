import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, push, onValue } from "firebase/database";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    area: "",
    message: "",
  });
  const [alerts, setAlerts] = useState([]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit alert: save to Firebase and send SMS via AWS
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1️⃣ Push alert to Firebase
    const alertsRef = ref(db, "alerts");
    push(alertsRef, {
      ...formData,
      date: new Date().toLocaleString(),
    });

    // 2️⃣ Send SMS via API Gateway
    try {
      const response = await fetch("https://06su46lvjf.execute-api.ap-south-1.amazonaws.com/prod/sendAlert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formData.mobile,
          message: `Water Alert: ${formData.message} in ${formData.area}`,
        }),
      });
      const data = await response.json();
      console.log("SMS Response:", data);
      if (data.status) alert(data.status);
    } catch (err) {
      console.error("Error sending SMS:", err);
      alert("⚠️ Failed to send SMS. Check sandbox verification.");
    }

    // Reset form
    setFormData({ name: "", email: "", mobile: "", area: "", message: "" });
  };

  // Listen for alerts in realtime from Firebase
  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAlerts(Object.values(data).reverse()); // latest first
      }
    });
  }, []);

  // Inline style for background
  const appStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "20px",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/water.jpg"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="App" style={appStyle}>
      <h1>🚰 Water Supply Alert System</h1>

      {/* Alert Form */}
      <div className="form-container">
        <h2>Send Alert</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Your Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
          />
          <input
            type="text"
            name="area"
            placeholder="Your Area"
            value={formData.area}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Enter Alert Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Alert</button>
        </form>
      </div>

      {/* Alerts Section */}
      <div className="alerts-container">
        <h2>📢 Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts yet.</p>
        ) : (
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>
                <strong>{alert.area}</strong> → {alert.message}
                <br />
                <small>
                  By {alert.name} ({alert.mobile}) on {alert.date}
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
