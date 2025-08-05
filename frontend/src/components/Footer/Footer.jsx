import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
              <img src={assets.logo} alt="" width="150px" height="120px" />
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa perferendis provident nulla molestiae sapiente dolorum aut, quisquam enim saepe illo?</p>
              <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
              </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-2314-242525</li>
                        <li>contact@foodie.com</li>
                    </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>
            Copyright 2025 Agniva Mukherjee &copy; Foody...
                     Made with love in India
        </p>
    </div>
  )
}

export default Footer