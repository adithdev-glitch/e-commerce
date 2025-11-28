import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Order.css";
import axios from "axios";
import { toast } from "react-hot-toast";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, userId } = location.state || { cartItems: [], userId: null };
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default COD
  const [total, setTotal] = useState('');
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState({
    street : "",
    city : "",
    state : "",
    zipcode : "",
    country : "",
    phone : "",
  });

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const calculatedTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(calculatedTotal + 50); // Add shipping
    }
  }, [cartItems]);

  useEffect(() => {
    if (!userId) return;  // Avoid making request with undefined ID
  
    const fetchAddresses = async () => {
      try {
 
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/order/address`,
          { params: { id: userId } }
        );
  
        const userData = response.data.user[0];
        let address = userData?.address || {};

        // Check if address is a string, parse it
        if (typeof address === "string") {
          try {
            address = JSON.parse(address);
          } catch (err) {
            console.error("Error parsing address JSON:", err);
            address = {};
          }
        }
        setAddress(address);

        } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
  
    fetchAddresses(userId, cartItems); // Call the function
  
  }, [userId, cartItems]);
  
  
  console.log("Fetched address:", address);
  

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    // if (!cartItems.length) {
    //   toast.error("Your cart is empty!");
    //   return;
    // }

    // if (!hasAddress) {
    //   toast.error("Please add your address before placing an order.");
    //   return;
    // }

    const orderData = {
        userId,
      items: cartItems,
      amount: total,
      address,
      paymentMethod,
    };

    try {
      if (paymentMethod === "COD") {
        const res = await axios.post(`${import.meta.env.VITE_SERVER}/order/place-order`,
          orderData,
          { headers: { token } }
        );

        if (res.status === 200) {
          localStorage.removeItem("cart");
          toast.success("Order placed successfully (COD)");
          navigate("/shipping");
        }
      } else if (paymentMethod === "UPI") {
        const {
          data: { order },
        } = await axios.post(
          `${import.meta.env.VITE_SERVER}/order/razorpay/create-order`,
          { amount: total },
          { headers: { token } }
        );

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY,
          amount: order.amount,
          currency: "INR",
          name: "Fashion Store",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response) {
            try {
              await axios.post(
                `${import.meta.env.VITE_URL}/order/razorpay/verify-payment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  orderData,
                },
                { headers: { token } }
              );
              localStorage.removeItem("cart");
              toast.success("Payment successful! Order placed.");
              navigate("/shipping");
            } catch (err) {
              console.error("Payment verification failed:", err);
              toast.error("Payment verification failed.");
            }
          },
          theme: { color: "#000000" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong while placing order.");
    }
  };
  
  return (
    <div className="order-page">
  <h1>Order Summary</h1>

  <div className="order-container">
    {/* Left Section – Product Items */}
    <div className="order-items">
      {cartItems.map((item) => (
        <div key={item._id} className="order-item">
          <img
            src={item.images?.[0]}
            alt={item.title}
            className="order-item-img"
          />

          <div className="order-item-info">
            <h3>{item.title}</h3>
            <p className="category">{item.category}</p>
            <p className="price">₹{item.price}</p>
            <p className="quantity">Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Right Section – User Details + Address + Price Summary */}
    <div className="order-summary">
      {/* User Details */}
      <div className="summary-box">
        <h2>User Details</h2>
        <p><strong>User ID:</strong> {userId}</p>
      </div>

      {/* Delivery Address */}
      <div className="summary-box">
        <h2>Delivery Address</h2>
        {address ? (
          <div className="address-card">
            <p><strong>Name:</strong> {address?.name || "User"}</p>
            <p><strong>Phone:</strong> {address?.phone || "-"}</p>
            <p>
              {address?.street || "-"}, {address?.city || "-"}, {address?.state || "-"}
            </p>
            <p>
              {address?.zipcode || "-"}, {address?.country || "-"}
            </p>
          </div>
        ) : (
          <p>No saved address found.</p>
        )}
      </div>

      {/* Payment Method */}
<div className="summary-box">
  <h2>Payment Method</h2>
  <div className="payment-options">
    <label>
      <input
        type="radio"
        name="payment"
        value="COD"
        checked={paymentMethod === "COD"}
        onChange={() => setPaymentMethod("COD")}
      />
      Cash on Delivery (COD)
    </label>

    <label>
      <input
        type="radio"
        name="payment"
        value="UPI"
        checked={paymentMethod === "UPI"}
        onChange={() => setPaymentMethod("UPI")}
      />
      Online Payment (UPI)
    </label>
  </div>
</div>

<form action="" onSubmit={handleFormSubmission}>
      {/* Order Summary */}
      <h2>Order Summary</h2>
      <div className="summary-item">
        <span>Subtotal</span>
        <span>₹{total - 50}</span>
      </div>
      <div className="summary-item">
        <span>Shipping</span>
        <span>₹50</span>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <button className="place-order-btn" >Place Order</button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Order;
