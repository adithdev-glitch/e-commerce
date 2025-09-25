import React, { useEffect, useState } from 'react';
import './Category.css';
import { assets } from '../../assets/asset';
import { GoArrowUpRight } from "react-icons/go";
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";


const Category = () => {
  function Counter({ endValue, duration = 1, suffix = "" }) {
    const { ref, inView } = useInView({
      triggerOnce: false, // Ensures animation happens only once
      threshold: 0.5, // Starts animation when 50% of the section is in view
    });
  
    return (
      <div ref={ref}>
        {inView ? <CountUp end={endValue} duration={duration} separator="," suffix={suffix} /> : 0}
      </div>
    );
  }
  return (
    <>
      <div className="main-part">
        <div className="left">
          <h6>Explore by Categories</h6>
        </div>
        <div className="right">
          <p>Discover curated pieces designed to elevate everyday elegance Whether you're dressing up, keeping it casual, or making a statement U/Fasion has you covered.</p>
          <p>--- U/Fasion has you covered.</p>
          <hr className='bigHR' />
          <div className="bar">
            <div className="bar-item">
              <h6><Counter endValue={20000} duration={1} suffix="+"/></h6>
              <p>Happy customer</p>
            </div>
            <div className="bar-item">
              <h6><Counter endValue={80} duration={1} suffix="%"/></h6>
              <p>Customer return rate</p>
            </div>
            <div className="bar-item">
              <h6><Counter endValue={5000} duration={1} suffix="+"/></h6>
              <p>Five-star rates</p>
            </div>
            <div className="bar-item">
              <h6>Weekly</h6>
              <p>New styles added</p>
            </div>
          </div>
        </div>

        <div className="bottom">
          {[
            { label: "Casuals", img: assets.botm6 },
            { label: "Formals", img: assets.botm2 },
            { label: "Tops", img: assets.botm5 },
            { label: "Bottoms", img: assets.botm3 },
            { label: "Part wear", img: assets.botm1 },
            { label: "Underwares", img: assets.botm4 },
          ].map((item, index) => (
            <motion.div
              className="bottom-item"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img src={item.img} alt={item.label} />
              <div className="item-header">
                <h6>{item.label}</h6>
                <GoArrowUpRight className="arrow-icon" />
              </div>
              <hr className='smallHR' />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
