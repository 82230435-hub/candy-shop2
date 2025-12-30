import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext"; // ✅ هنا
import "./Navbar.css";

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth(); // ✅ استخدم context مباشرة
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">CandyShop</NavLink>
        <button className="menu-toggle" onClick={()=>setOpen(!open)}>☰</button>
        <div className={`navbar-links ${open ? "active" : ""}`}>
          <NavLink to="/" className={({isActive}) => isActive ? "active" :""}>Home</NavLink>
          <NavLink to="/features">Products</NavLink>
          {user ? (
            <>
              <span>Hello, {user.username || user.email}</span>
              <button onClick={logout}>Logout</button> {/* ✅ الصح */}
            </>
          ) : (
            <>
              <NavLink to="/about" className={({isActive}) => isActive ? "active" :""}>About</NavLink>
              <NavLink to="/contact" className={({isActive}) => isActive ? "active" :""}>Contact</NavLink>
              <NavLink to="/register" className={({isActive}) => isActive ? "active" :""}>Register</NavLink>
              <NavLink to="/login" className={({isActive}) => isActive ? "active" :""}>Login</NavLink>
            </>
          )}
          <NavLink to="/cart" className={({isActive}) => isActive ? "active" :""}>
            Cart ({cart.reduce((s,p)=>s+p.qty,0)})
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
