import React from 'react'
import './Side.css'
import { HiHome } from "react-icons/hi";
import { IoCardSharp, IoPerson } from "react-icons/io5";
import { BiCandles } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay between each list item
      },
    },
  };

  const item = {
    hidden: { y: -50, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      } 
    },
  };
  return (
    <motion.div className="sidebar" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
      <h2>Admin Panel</h2>
     <hr />
     <motion.ul 
      className="menu"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.li variants={item}><Link to="/admin"><HiHome className="icon" /> Profile</Link></motion.li>
      <motion.li variants={item}><Link to="/admin/profile"><IoPerson className="icon" /> Dashboard</Link></motion.li>
      <motion.li variants={item}><Link to="/admin/billing"><IoCardSharp className="icon" /> Billing</Link></motion.li>
      <motion.li variants={item}><Link to="/admin"><BiCandles className="icon" /> Update Products</Link></motion.li>
      <motion.li variants={item}><Link to="/admin/add-product"><AiFillProduct className="icon" /> Add Products</Link></motion.li>
    </motion.ul>
      <button className="logout-btn"  onClick={logoutHandler}>Logout</button>
    </motion.div>
  )
}

export default Side
