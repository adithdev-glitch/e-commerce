import React from 'react'
import './Content.css'
import { motion } from 'framer-motion';
import { LiaTruckPickupSolid } from "react-icons/lia";
import { PiTShirt } from "react-icons/pi";
import { CiCreditCard1 } from "react-icons/ci";



const Content = () => {
  const text = "Follow @ U / Fashion • ";
  return (
    <>
    <div className="main-2">
      <h5>Clothing & Outfits for Women</h5>
      <div className="border-div">
        <div className="icon-text">
          <LiaTruckPickupSolid className='truck'/>
          <p>Speed you can trust, delivery you can count on.</p>
        </div>
        <div className="icon-text">
          <CiCreditCard1 />
          <p>Pay your way — cards, UPI, wallets & more.</p>
        </div>
        <div className="icon-text">
          <PiTShirt />
          <p>Elegance is when the inside is as beautiful as the outside.</p>
        </div>
      </div>
      <div className="scroll-container">
      <motion.div
        className="scroll-track"
        animate={{ x: ['0%', '-50%'] }} // loop half-width since content is duplicated
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <span>{text.repeat(20)}</span>
        <span>{text.repeat(20)}</span>
      </motion.div>
    </div>
    </div>
    
    </>
  )
}

export default Content
