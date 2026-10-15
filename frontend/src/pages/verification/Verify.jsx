import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Verify.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, password } = location.state || {};

  useEffect(() => {
    if (!email) {
      toast.error("No registration data found. Please register first.");
      navigate("/");
    }
  }, [email, navigate]);

  const handleOtpChange = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the verification code");
      return;
    }
    try {
      const serverUrl = import.meta.env.VITE_SERVER || "http://localhost:8080";
      const response = await axios.post(`${serverUrl}/verify`, {
        name,
        email,
        password,
        otp
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  const handleResendOtp = async () => {
    try {
      const serverUrl = import.meta.env.VITE_SERVER || "http://localhost:8080";
      const response = await axios.post(`${serverUrl}/resend-otp`, { email });
      toast.success(response.data.message);
      setTimer(60);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    }
  };


  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <div className="verification-container">
      <div className="verification-box">
        <h2>Verify Your Account</h2>
        <p>Enter the 6-digit code sent to your email or phone.</p>
        <form onSubmit={handleOtpChange}>
          <input
            type="text"
            placeholder="Enter code"
            className="code-input"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
          />
          <button type="submit" className="verify-btn">Verify</button>
        </form>
        {/* 🔹 Resend OTP Button with countdown */}
        {timer > 0 ? (
          <p className="countdown-text" >Resend OTP in {timer}s</p>
        ) : (
          <button type="button" className="resend-btn" onClick={handleResendOtp}>
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
};

export default Verify;
