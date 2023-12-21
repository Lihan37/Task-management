// Banner.js

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import bannerImage from '../../assets/Blue Gradient Modern Startup Coming Soon Banner.png';
import { Link } from 'react-router-dom';

const Banner = () => {
  const bannerStyle = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };

  const imgStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  return (
    <motion.div className="banner" style={bannerStyle} initial="hidden" animate="visible" variants={fadeIn}>
      <img src={bannerImage} alt="Banner" style={imgStyle} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full">
        <h1 className="text-xl md:text-4xl lg:text-5xl mb-4">Your Task Management Solution</h1>
        <p className="text-sm md:text-lg lg:text-xl mb-4">Collaborate, organize, and achieve more together.</p>
        <Link to='/login'>
          <button className="bg-blue-500 inline-flex items-center text-white px-4 py-2 text-sm md:text-base rounded-xl lg:text-lg">
            Let's Explore <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Banner;
