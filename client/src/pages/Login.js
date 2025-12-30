import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", { email, password })
      .then(res => {
        login(res.data.user); // حفظ المستخدم في AuthContext
        navigate("/features");
      })
      .catch(err => alert(err.response?.data?.message || "Invalid credentials"));
  };
const containerStyle = { maxWidth: "400px", margin: "0 auto", padding: "40px 20px" };
  const inputStyle = { padding: "8px", borderRadius: "4px", border: "1px solid #ccc" };
  const buttonStyle = { padding: "10px 16px", background: "#ec4899", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required  style={inputStyle}/><br/>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle}/><br/>
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
}

export default Login;
