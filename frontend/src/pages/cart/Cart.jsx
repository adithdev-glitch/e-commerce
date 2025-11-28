import React, { useState, useEffect} from "react";
import "./Cart.css";
import axios from "axios";
import{ jwtDecode  }from "jwt-decode";
import {useNavigate} from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const token = localStorage.getItem("token");

// Decode token once
let userId = null;
if (token) {
  try {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  } catch (err) {
    console.error("Invalid token:", err.message);
  }
} else {
  console.log("No token found in localStorage");
}

useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/address`, {
        params: { id: userId }
      });
      let addressData = response.data;
      if (typeof addressData === "string") {
  addressData = JSON.parse(addressData);
}

setAddresses(addressData);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
    fetchAddresses(); // Call the function
  
}, []); // Re-run

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

 
  const handleCheckout = () => {
    navigate("/home/order", {
      state: {
        cartItems,
        userId,
      },
    });
  };
  

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
        <h2>Delivery Address</h2>

        {/* Show addresses from DB (and local if added) */}
        {addresses && Object.keys(addresses).length > 0 ? (
  <div className="address-list">
    <div className="address-card">
      <p><strong>{addresses.name || "User"}</strong></p>
      <p>Mob : {addresses.phone || "-"}</p>
      <p>
        {addresses.street || "-"}, {addresses.city || "-"}, {addresses.state || "-"}
      </p>
      <p>{addresses.zipcode || "-"}, {addresses.country || "-"}</p>
    </div>
  </div>
) : (
  <p className="no-address">No saved addresses found.</p>
)}


        {/* ➕ Add New Address Button */}
        <button
          className="add-address-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "➕ Add New Address"}
        </button>

        {/* 📋 Add Address Form */}
        {/* {showAddForm && (
          <form className="address-form" >
            <h3>Add New Address</h3>

            <div className="form-row">
              <input
                type="text"
                placeholder="Full Name"
                value={newAddress.name}
                onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newAddress.phone}
                onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Street Address"
              value={newAddress.street}
              onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
              required
            />

            <div className="form-row">
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="State"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                required
              />
            </div>

            <input
              type="text"
              placeholder="Pincode"
              value={newAddress.pincode}
              onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
              required
            />

            <button type="submit" className="save-address-btn">
              Save Address
            </button>
          </form>
        )} */}
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

          <button className="checkout-btn" onClick={handleCheckout}>Proceed to order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
