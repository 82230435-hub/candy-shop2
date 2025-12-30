import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to CandyShop!</h1>
      <p>Discover the sweetest treats online!</p>
      <img
        src="http://localhost:5000/images/Candys.png"
        alt="Candies"
        width="300"
      />
      <div style={{ marginTop: "20px" }}>
        <Link
          to="/features"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            backgroundColor: "#f06292",
            color: "white",
            borderRadius: "5px"
          }}
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
