import { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, user) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    axios.post("https://candy-shop-server.onrender.com/api/cart", {
      user_id: user.id,
      product_id: product.id,
      quantity: 1
    }).then(() => {
      setCart(prev => {
        const exist = prev.find(p => p.id === product.id);
        if (exist) {
          return prev.map(p =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          );
        }
        return [...prev, { ...product, qty: 1 }];
      });
    }).catch(err => console.log(err));
  };

  const removeFromCart = (product_id, user) => {
    if (!user) return;
    axios.delete(`https://candy-shop-server.onrender.com/api/cart/${product_id}`)
      .then(() => setCart(prev => prev.filter(p => p.product_id !== product_id)))
      .catch(err => console.log(err));
  };

  const clearCart = (user) => {
    if (!user) return;
    axios.delete(`https://candy-shop-server.onrender.com/api/cart/user/${user.id}`)
      .then(() => setCart([]))
      .catch(err => console.log(err));
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
