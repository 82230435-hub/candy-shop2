import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Features from "./pages/Features";

function App() {
  return (
    <>
     
      <Navbar />
 <main style={{ padding: "32px" }}>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </main>
        <footer style={{ textAlign:"center", padding:"16px", background:"#333", color:"#fff" }}>
          © {new Date().getFullYear()} CandyShop
        </footer>
    </>
  );
}

export default App;
