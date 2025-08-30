import React, { useState } from "react";
import "./ContactUs.css";

const HaveQuestions = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ fullName: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    }
  };

  return (
    <section className="have-questions">
      <div className="hq-container">
        <div className="hq-right">
          <h2>Have Questions? Let&apos;s Talk.</h2>
          <p>Fill the form — we&apos;ll get in touch soon.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="hq-form">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <div className="hq-success">
              <h3>✅ Thank you for your message!</h3>
              <p>We will get back to you soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HaveQuestions;
