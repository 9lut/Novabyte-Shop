import React, { useState, useEffect } from 'react';
import { useNavigate , NavLink } from 'react-router-dom';
import { userData } from '../helpers';
import { FaShoppingBasket } from "react-icons/fa";
import "./NovaNavbar.css"

const NovaNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { name } = userData();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsLoggedIn(storedUser ? true : false);

    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      setCartItemCount(cartItems.length);
    }
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={require("../image/LOGO-WED.png")} alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggle}
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/productall">สินค้าทั้งหมด</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/payment">แจ้งการโอน</a>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link basket-icon-wrapper">
                <span className="basket-items">{cartItemCount}</span>
                <FaShoppingBasket className="basket-icon" />
              </NavLink>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <div className="dropdown">
                  <button className="btn btn-outline-light my-2 my-sm-0 dropdown-toggle" type="button" id="dropdownMenuButton" onClick={toggle} aria-haspopup="true" aria-expanded={isOpen ? "true" : "false"}>
                    {name}
                  </button>
                  <div className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item"  onClick={() => handleNavigation("/profile")}>โปรไฟล์</button>
                    <button className="dropdown-item"  onClick={() => handleNavigation("/orderhistory")}>ประวัติการสั่งซื้อ</button>
                    <button className="dropdown-item" onClick={handleLogout}>ออกจากระบบ</button>
                  </div>
                </div>
              ) : (
                <button className="btn btn-outline-light my-2 my-sm-0" onClick={() => handleNavigation("/login")}>เข้าสู่ระบบ/สมัครสมาชิก</button>
              )}
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default NovaNavbar;