import React, { useState, useEffect } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // 🧠 Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // 🧠 Whenever cartItems changes, update localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔹 Increase / decrease quantity
  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                type === "inc" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  // 🔹 Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // 🔹 Calculate total
  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!cartItems.length) {
    return <div className="empty-cart">🛒 Your cart is empty!</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="cart-item-img"
              />

              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item._id, "dec")}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, "inc")}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeItem(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹{getTotal()}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>₹50</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{getTotal() + 50}</span>
          </div>

          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
