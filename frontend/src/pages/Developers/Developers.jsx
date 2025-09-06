// src/pages/Developers.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Developers.css"; // for styling

// You can pass images later in assets folder



const devs = [
  {
    name: "Agniva Mukherjee",
    role: "Frontend and Backend Developer |React & Next.js,MongoDB,Express,Node.js",
    img: '/agniva.jpg',
  },
  {
    name: "Suvam Chaterjee",
    role: "Frontend Developer | React.js, Html , Css",
     img: '/suvam.jpg',
 
  },
  {
    name: "Sk. Niser Parvej",
    role: "UI/UX Designer | Figma & Canva",
    img:'/niser.jpg',
   
  },
  {
    name: "Priyangshu Roy",
    role: "Frontend developer | React & Tailwindcss",
    img:'/priyansu.jpg',
   
  },
];

const Developers = () => {
  return (
    <div className="developers-page">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meet Our Developers
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        This section is dedicated to the people who built and maintain FOODY.
      </motion.p>

      <div className="dev-team">
        {devs.map((dev, index) => (
          <motion.div
            key={index}
            className="dev-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={dev.img} alt={dev.name} className="dev-img" />
            <h2>{dev.name}</h2>
            <p>{dev.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Developers;

