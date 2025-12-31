import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

function Features() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://candy-shop-server.onrender.com/api/products")
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Our Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            user={user}
            onAdd={() => addToCart(p, user)}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
