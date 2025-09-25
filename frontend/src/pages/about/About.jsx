import React from 'react';
import './About.css';
import { assets } from '../../assets/asset';


const About = () => {

  return (
    <>
    <h1 className='about-head'>Who We Are</h1>
    <div className='about'>
      <div className="left-section">
        <img src={assets.about_1} alt="" />
        <h2>Makeing Somthing New</h2>
        <p>At U/Fashion, we believe in the power of simplicity with purpose.
        Each design is thoughtfully created to embody timeless elegance while 
        honoring sustainability and conscious craftsmanship.</p>
      </div>
      <div className="right-section">
        <h2>Our Philosophy</h2>
        <p>
          U/Fashion was born out of a desire to redefine minimalism in fashion. 
            With a deep commitment to ethical production and refined aesthetics, 
            our pieces are crafted for the modern individual who values quality and intention.
          </p>
        <img src={assets.about_2} alt="" />
      </div>
    </div>

    </>
  );
};

export default About;
