import React from 'react'
import './Side.css'
import { HiHome } from "react-icons/hi";
import { IoCardSharp, IoPerson } from "react-icons/io5";
import { BiCandles } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { Link } from 'react-router-dom';

const Side = () => {
  const logoutHandler = async(e) => {
    e.preventDefault();
    try {
        localStorage.removeItem("token");
        window.location.href = "/";
        toast.success("Logout successful");
    } catch (error) {
        toast.error("Logout failed", error);
    }
  }
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
     
      <ul className="menu">
        <li><Link to="/admin"><HiHome className="icon" /> Dashboard</Link></li>
        <li><Link to="/admin/profile"><IoPerson className="icon" /> Profile</Link></li>
        <li><Link to="/admin"><BiCandles className="icon" /> Tables</Link></li>
        <li><Link to="/admin/billing"><IoCardSharp className="icon" /> Billing</Link></li>
        <li><Link to="/admin/add-product"><AiFillProduct className="icon" /> Add Products</Link></li>
      </ul>
      <button className="logout-btn" onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Side
