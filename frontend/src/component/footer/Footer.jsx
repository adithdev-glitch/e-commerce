import React from 'react'
import './Footer.css'
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer >
        <div className="footer">
        <div className="footer-container">
          <div className="footer-section brand">
            <h2>U/FASHION</h2>
            <p>ADITH TP</p>
            <p>adithadhivr46@gmail.com</p>
            <p>+91 9847325601</p>
          </div>

          <div className="footer-section">
            <h4>Get Help</h4>
            <ul>
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Order Status</li>
              <li>Payment Options</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>About</li>
              <li>Contact</li>
              <li>Services</li>
              <li>Privacy & Policies</li>
            </ul>
          </div>

          <div className="footer-section social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <FaFacebookF />
              <FaInstagram />
              <FaXTwitter />
              <FaTelegramPlane />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 U/FASHION. All Rights Reserved.</p>
        </div>
        </div>
      </footer>
      
    </>
  )
}

export default Footer;
