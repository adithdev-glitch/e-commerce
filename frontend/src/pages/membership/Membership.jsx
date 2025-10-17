import React from "react";
import "./Membership.css";
import { assets } from "../../assets/asset";
import { motion } from "framer-motion";

const perks = [
  { img: assets.gift, initial: { y: -30, rotate: -10, opacity: 0 } },
  { img: assets.truck, initial: { x: -50, rotate: 5, opacity: 0 } },
  { img: assets.card, initial: { y: 40, rotate: 10, opacity: 0 } },
  { img: assets.pillow, initial: { x: 50, rotate: -5, opacity: 0 } },
];

const Membership = () => {
  return (
    <div className="main-5">
      <div className="member-header">
        <h2>Membership Perks</h2>
      </div>

      <div className="member-content">
        {perks.map((perk, index) => (
          <motion.img
            key={index}
            src={perk.img}
            initial={perk.initial}
            whileInView={{
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: index * 0.3,
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{
              scale: 1.2,
              rotate: [0, 5, -5, 0],
              y: -10,
              transition: { duration: 0.5, yoyo: Infinity },
            }}
            className="perk-image"
            alt={`perk-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Membership;
