import React, { useState } from "react";
import "./ResetPass.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword =() => {
  const { token } = useParams(); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/reset-password", {
          token,
          password,
          confirmPassword
        });
        if (response.data.status === "error") {
          toast.error(response.data.message);
        } else {
          toast.success(response.data.message);
          navigate("/");
        }
    } catch (error) {
        toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-wrapper">
      <form className="reset-card" onSubmit={handleSubmit} >
        <h2>Reset Password</h2>
        <p className="subtitle">Create a strong new password for your account</p>

        <label>New Password</label>
        <input
          className="reset-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          required
        />

        <label>Confirm Password</label>
        <input
        className="reset-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter new password"
          required
        />
        <button type="submit" className="reset">Reset Password</button>
        <a href="/" className="back-link">← Back to Login</a>
      </form>
    </div>
  );
}

export default ResetPassword;