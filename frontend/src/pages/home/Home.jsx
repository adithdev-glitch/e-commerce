import React, { useState } from 'react'
import './Home.css'
import { motion, AnimatePresence} from 'framer-motion';
import { FaArrowRight } from "react-icons/fa";
import { IoIosStarOutline } from "react-icons/io";
import { assets } from '../../assets/asset';
import Auth from '../../pages/auth/Auth';
import Category from '../../component/category/Category';
import Content from '../../component/category/Content';
import NewArrival from '../../component/category/NewArrival';
import Search from '../../component/search/Search';
import Membership from '../membership/Membership';

const Home = ({ showLogin, onCloseLogin, showSearch, onCloseSearch }) => {
    const [showAlternate, setShowAlternate] = useState(false);
    const bgColor = showAlternate ? "#c7a782" : "#f0f2ed"; // light and dark


  const handleExploreClick = () => {
    setShowAlternate(prev => !prev);
  };

  return (
    <>
    <motion.div className="main"
    transition={{ duration: 0.8, ease: "easeInOut" }}>
        <motion.div className="side-line-left" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: .8 }}>
            <h2>Clean Lines.</h2>
            <h2>Conscious Living.</h2>
            <motion.div className="quote" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>
                <p>"Timeless, wearable,and truly well made."</p>
            </motion.div>
        </motion.div>
        <motion.div className="side-line-right" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 1 }}>
            <p>Timeless essentials for the modern minimalist. Designed to simplify your wardore --- and elevate your everyday.</p>
            <button className='explore-btn' onClick={handleExploreClick}>Explore the Collection<FaArrowRight className="arrow-icon"/></button>
            <div className="review">
                <h6>/</h6>
                <p className="stars">
                    <IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline /><IoIosStarOutline />
                </p>
                <p>4.5 / 450 Reviews</p>
            </div>
        </motion.div>
        
        <motion.div
            className="fasion"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }} >
        <p>FASHION</p>
        </motion.div>
        <AnimatePresence mode="wait">
            <motion.img
              key={showAlternate ? "img2" : "img1"}
              src={showAlternate ? assets.male : assets.pic2}
              alt="model"
              className="model"
              initial={{ scale: 1.5, opacity: 0, filter: 'brightness(150%) blur(6px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'brightness(100%) blur(0)' }}
              exit={{ scale: 0.8, opacity: 0, filter: 'brightness(70%) blur(6px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
        </AnimatePresence>
    </motion.div>
    {showLogin && <Auth onClose={onCloseLogin} />}
    {showSearch && <Search OffSearch={onCloseSearch}/>}
    <Category />
    <Content />
    <NewArrival />
    <Membership />
    </>
  )
}

export default Home
