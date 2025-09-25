import React,{useState} from 'react';
import './Contact.css';
import { motion } from 'framer-motion';

const topics = ['Billing', 'Sign up', 'Bug', 'Out of Stock', 'Connection', 'Sign in', 'Order', 'Other'];

const Contact = () => {
  const [selected, setSelected] = useState(null);
  return (
    <>
    <div className="container">
      <div className="section">
        <motion.h1 initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        >Contact us</motion.h1>
        <motion.p initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}>Questions, Bugs reports, Feedbacks -- we're here for all of it.</motion.p>
      </div>
      <motion.div className="pop" initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}>
        <h5>Select Topic :</h5>
        <div className="btns">
          {topics.map((topic, index) => (
            <div
            key={index}
            className={`btn-1 ${selected === topic ? 'active' : ''}`}
            onClick={() => setSelected(topic)}
            >
            {topic}
          </div>
        ))}
        </div>
        <h2>Tell Us :</h2>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button className='submit'>Submit</button>
      </motion.div>
    </div>
    </>
  );
};

export default Contact;
