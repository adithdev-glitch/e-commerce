import React, { useState } from 'react';
import './Contact.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const topics = [
  'Billing',
  'Sign up',
  'Out of Stock',
  'Connection',
  'Bug',
  'Sign in',
  'Order',
  'Other',
];

const Contact = () => {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!formData.name || !formData.email || !formData.message || !selected) {
    setError('Please fill out all fields and select a topic.');
    return;
  }

  setError('');
  setSubmitted(true);

  try {
    // Send form data to backend
    const response = await axios.post('http://localhost:8080/contact', {
      name: formData.name,
      email: formData.email,
      topic: selected,
      message: formData.message,
    });
    toast.success('Message sent successfully!');

    // Reset form on success
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setSelected(null);
    }, 3000);
  } catch (err) {
    console.error(err);
    setError('Something went wrong. Please try again.');
    setSubmitted(false);
  }
};


  return (
    <div className="contact-container">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Contact Us</h1>
        <p>Questions, bug reports, feedback — we’d love to hear from you.</p>
      </motion.div>

      {/* AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="contact-form"
            className="contact-form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            <h5>Select a Topic</h5>
            <div className="topic-buttons">
              {topics.map((topic, index) => (
                <motion.div
                  key={index}
                  className={`topic-btn ${selected === topic ? 'active' : ''}`}
                  onClick={() => setSelected(topic)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {topic}
                </motion.div>
              ))}
            </div>

            <h2>Tell Us More</h2>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>

            {error && <p className="error-text">{error}</p>}

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.05, background: 'linear-gradient(135deg, #222, #444)' }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </motion.form>
        ) : (
          // ✅ Success Message Animation
          <motion.div
            key="success-message"
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="success-icon"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.6 }}
            >
              ✅
            </motion.div>
            <h2>Thank you for reaching out!</h2>
            <p>We’ve received your message and will get back to you soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
