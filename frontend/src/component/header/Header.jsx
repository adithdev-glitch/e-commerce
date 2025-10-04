import React, { useContext, useState } from 'react';
import './Header.css';
import { GoArrowUpRight } from "react-icons/go";
import { CiSearch, CiHeart, CiUser } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi"; 
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const Header = ({ darkMode, onLoginClick, onSearchClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className={darkMode ? 'header dark' : 'header light'}>
        <div className="ham-div">
        <button className="hamburger" onClick={toggleMenu}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      
        <motion.ul
          className={`nav-left ${isOpen ? 'show' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <li><Link to="/"><GoArrowUpRight /> Home</Link></li>
          <li><Link to="/home/shop"><GoArrowUpRight /> Shop</Link></li>
          <li><Link to="/home/about"><GoArrowUpRight /> About</Link></li>
          <li><Link to="/home/contact"><GoArrowUpRight /> Contact</Link></li>
          <h2 className="logo">U/FASHION</h2>
        </motion.ul>

        <motion.ul
           className={`nav-right ${isOpen ? 'show' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <li><Link to="" onClick={onSearchClick}><CiSearch /> Search</Link></li>
          <li><Link to="/home/favourite"><CiHeart /> Favorite</Link></li>
          <li><Link to="/home/cart"><IoBagOutline /> Cart</Link></li>
          <li>
        {localStorage.getItem('token') ? (
          <Link to="/home/account">
            <CiUser /> Account
          </Link>
        ) : (
          <Link to="" onClick={onLoginClick}>
            <CiUser /> Login
          </Link>
        )}
      </li>
        </motion.ul>
      </nav>
    </>
  );
};

export default Header;
