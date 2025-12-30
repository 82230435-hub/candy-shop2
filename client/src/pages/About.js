import React from "react";

function About() {
  return (
    <div style={{
      maxWidth: "800px",
      margin: "40px auto",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      padding: "0 20px",
    }}>
      <h2 style={{
        fontSize: "2.2rem",
        marginBottom: "20px",
        color: "#ec4899",
        fontWeight: 700
      }}>
        About CandyShop
      </h2>
      
      <p style={{ margin: "16px 0", lineHeight: 1.8, fontSize: "1.1rem" }}>
        Welcome to <strong style={{ color: "#d63384" }}>CandyShop</strong>! We are passionate about bringing
        the sweetest treats to your fingertips. Our store offers a variety of
        candies, chocolates, gummies, and lollipops, all carefully selected to
        delight your taste buds.
      </p>
      
      <p style={{ margin: "16px 0", lineHeight: 1.8, fontSize: "1.1rem" }}>
        Our mission is simple: make every day sweeter. Whether you’re treating
        yourself or looking for a gift for someone special, CandyShop has the
        perfect candy for every occasion. Explore our products, register an
        account, and enjoy a seamless online shopping experience.
      </p>
      
      <p style={{ margin: "16px 0", lineHeight: 1.8, fontSize: "1.1rem" }}>
        Thank you for choosing CandyShop — where happiness comes in every bite!
      </p>
    </div>
  );
}

export default About;