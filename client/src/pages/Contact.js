import React, { useState } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("https://candy-shop-server.onrender.com/api/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send message.");
    }
  };
const containerStyle = { maxWidth: "400px", margin: "0 auto", padding: "40px 20px" };
  const inputStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" };
  const buttonStyle = { padding: "10px 16px", background: "#ec4899", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };

  return (
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      {submitted && <p>Message sent!</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" style={inputStyle}/><br/>
        <input value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" style={inputStyle}/><br/>
        <textarea value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} placeholder="Message" style={inputStyle}/><br/>
        <button type="submit" style={buttonStyle}>Send</button>
      </form>
    </div>
  );
}
export default Contact;
