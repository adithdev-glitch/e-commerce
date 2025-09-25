import React, { useState } from 'react'
import './ForgotPass.css'
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPass = () => {
    const [email, setEmail] = useState('');
    const handleForgotPassword = async(e) => {
    e.preventDefault();
   try {
        const response = await axios.post("http://localhost:8080/forgot-password", {
        email: email,
        });
        if (response.data.status === "error") {
          toast.error(response.data.message);
        }else{
          toast.success(response.data.message);
          localStorage.setItem("resetToken", response.data.token);
        }
   } catch (error) {
    toast.error("Error sending reset link. Please try again.");
  }

}
  return (
    <>
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <div className="back-link">
          <a href="/">Back to Login</a>
        </div>
      </div>
    </div>
    </>
  )
}

export default ForgotPass
