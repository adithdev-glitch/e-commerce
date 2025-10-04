import React, { useState, useEffect } from "react";
import "./Wishlist.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // 🧠 Load wishlist and cart from localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, []);

  // 🧠 Update localStorage when wishlist or cart changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [wishlist, cart]);

  // 🔹 Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  // 🔹 Move item to cart
  const moveToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        { ...product, quantity: 1 }, // add quantity field
      ];
    }

    setCart(updatedCart);
    removeFromWishlist(product._id);
    alert("🛒 Moved to cart!");
  };

  if (!wishlist.length) {
    return <div className="empty-wishlist">💔 Your wishlist is empty!</div>;
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>

      <div className="wishlist-container">
        {wishlist.map((item) => (
          <div key={item._id} className="wishlist-item">
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="wishlist-img"
            />
            <div className="wishlist-info">
              <h3>{item.title}</h3>
              <p className="category">{item.category}</p>
              <p className="price">₹{item.price}</p>

              <div className="wishlist-actions">
                <button
                  className="move-to-cart"
                  onClick={() => moveToCart(item)}
                >
                  Move to Cart
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
