import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { assets } from '../../assets/asset';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <div className="about-containe">
      {/* Header */}
      <motion.h1
        className="about-head"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Who We Are
      </motion.h1>

      {/* Intro Section */}
      <div className="about-intro">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span>U/Fashion</span> is more than a label — it’s a mindset.  
          We create modern, minimal, and mindful fashion for those who embrace individuality
          and care for the planet.
        </motion.p>
      </div>

      {/* Two Main Sections */}
      <div className="about-content">
        <motion.div
          className="about-section left-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <motion.img
            src={assets.about_1}
            alt="Crafting with care"
            className="about-img"
            whileHover={{ scale: 1.05 }}
          />
          <h2>Making Something New</h2>
          <p>
            Each design begins with a story — a spark of inspiration drawn from everyday life, 
            architecture, and art. At <span>U/Fashion</span>, our creative process blends innovation 
            and tradition, ensuring every piece feels unique yet timeless.
          </p>
        </motion.div>

        <motion.div
          className="about-section right-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <h2>Our Philosophy</h2>
          <p>
            We redefine minimalism — not as the absence of expression, but as the essence of it.  
            Each stitch, silhouette, and seam reflects a balance of simplicity and sophistication.
          </p>
          <motion.img
            src={assets.about_2}
            alt="Design philosophy"
            className="about-img"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="about-mission">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true }}
        >
          Our Mission
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
        >
          To craft clothing that empowers — where comfort meets consciousness.  
          We aim to build a world where sustainability isn’t a choice, but a standard.
        </motion.p>

        <motion.div
          className="about-gallery"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          viewport={{ once: true }}
        >
          {[assets.about_3, assets.about_4, assets.about_5].map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Gallery ${index}`}
              className="gallery-img"
              variants={fadeInUp}
              whileHover={{ scale: 1.06 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="about-values">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true }}
        >
          Our Core Values
        </motion.h2>
        <div className="values-grid">
          {[
            {
              title: "Sustainability",
              desc: "We use eco-conscious materials and ethical processes to ensure every creation respects the planet.",
            },
            {
              title: "Craftsmanship",
              desc: "Each garment is meticulously designed, blending precision with creativity.",
            },
            {
              title: "Authenticity",
              desc: "We celebrate individuality — encouraging people to express themselves fearlessly.",
            },
          ].map((val, i) => (
            <motion.div
              className="value-card"
              key={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={i + 1}
              viewport={{ once: true }}
            >
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing Section */}
      <motion.div
        className="about-footer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3>“Fashion fades, but purpose is eternal.”</h3>
        <p>At <span>U/Fashion</span>, we don’t just design clothing — we design experiences that connect emotion and elegance.</p>
      </motion.div>
    </div>
  );
};

export default About;
