import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='footer' id='footer'>
      <div className="footer-content">
        
        {/* Left Section */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Foody Logo" className="footer-logo" />
          <h1 className="footer-tagline">
            Delicious food delivered to your doorstep. Experience taste, quality,
            and convenience with <strong>Foody</strong>.
          </h1>
          
          
        </div>

        {/* Center Section */}
        <div className="footer-content-center">
          <h2>ABOUT FOODY</h2>
          <ul>
            <li><a href="#">Who We Are</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Work With Us</a></li>
            <li><a href="#">Press Kit</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-content-center">
          <h2>LEARN MORE</h2>
          <ul>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Terms and Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        
        {/* Extra Section - App Download */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="tel:+12314242525">+1-2314-242525</a></li>
            <li><a href="mailto:contact@foodie.com">contact@foodie.com</a></li>
          </ul>

          <div className="footer-social-icons">
            <a href="#"><img src={assets.facebook_icon} alt="Facebook" /></a>
            <a href="#"><img src={assets.linkedin_icon} alt="LinkedIn" /></a>
            <a href="#"><img src={assets.twitter_icon} alt="Twitter" /></a>
          </div>
        </div>
        
        </div>
        
        <hr />

      <h6 className="footer-copyright">
        By continuing past this page, you agree to our{" "}
        <a href="#">Terms of Service</a>, <a href="#">Cookie Policy</a>,{" "}
        <a href="#">Privacy Policy</a> and <a href="#">Content Policies</a>.
        All trademarks are properties of their respective owners.
        2008-2025 © <strong>Foody™ Ltd.</strong> All rights reserved.
        Made with Love in India.
      </h6>
    </footer>
  )
}

export default Footer
