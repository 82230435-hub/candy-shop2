import React from "react";
import "./ProductCard.css";
function ProductCard({ product, onAdd, user }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <img
        src={`https://candy-shop-server.onrender.com/images/${product.image}`}
        alt={product.name}
        width="150"
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={onAdd} disabled={!user}>
        {user ? "Add to Cart" : "Login to Add"}
      </button>
    </div>
  );
}

export default ProductCard;
