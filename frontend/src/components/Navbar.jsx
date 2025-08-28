import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleMenuClick = (value) => {
    setMenu(value);
    setIsOpen(false); // close menu after clicking
  };

  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <h1 className="logo">🍴 FOODY</h1>
      </Link>

      {/* Hamburger */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Slide-in Menu */}
      <ul className={`navbar-menu ${isOpen ? "show" : ""}`}>
        <Link
          to="/"
          onClick={() => handleMenuClick("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#food-display"
          onClick={() => handleMenuClick("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => handleMenuClick("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => handleMenuClick("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
        <Link
          to="/developers"
          onClick={() => handleMenuClick("developers")}
          className={menu === "developers" ? "active" : ""} 
        >
          Developers
        </Link>

        {/* Right section inside mobile menu */}
        <div className="navbar-right mobile-only">
          <img src={assets.search_icon} alt="search" />
          <div className="navbar-search-icon">
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              <img src={assets.basket_icon} alt="cart" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            <div className="cart-count">
              {getTotalCartAmount() > 0 && <span>{getTotalCartAmount()}</span>}
            </div>
          </div>
          <div>
            {!token ? (
              <button
                onClick={() => {
                  setShowlogin(true);
                  setIsOpen(false);
                }}
              >
                Sign in
              </button>
            ) : (
              <div className="navbar-profile">
                <img src={assets.profile_icon} alt="profile" />
                <ul className="nav-profile-dropdown">
                  <li
                    onClick={() => {
                      navigate("/myorders");
                      setIsOpen(false);
                    }}
                  >
                    <img src={assets.bag_icon} alt="orders" /> <p>Orders</p>
                  </li>
                  <hr />
                  <li
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                  >
                    <img src={assets.logout_icon} alt="logout" /> <p>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
