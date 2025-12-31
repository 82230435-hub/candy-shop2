import React, { useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "./Cart.css";
function Cart() {
  const { cart, setCart, removeFromCart, clearCart, total } = useCart();
  const { user } = useAuth();

  // جلب الكارت من DB عند فتح الصفحة
  useEffect(() => {
    if (!user) return;
    axios.get(`https://candy-shop-server.onrender.com/api/cart/${user.id}`)
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, [user, setCart]);

  if (!user) return <p>Please login to view your cart</p>;
  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={() => clearCart(user)}>Clear Cart</button>
    </div>
  );
}

export default Cart;
