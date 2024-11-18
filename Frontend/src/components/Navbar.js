import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="head">
        <img src="/logo1.jpg" className="logo logo-signup" alt="logo" />
        <h2>Trackify</h2>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span className={isMobileMenuOpen ? "bar open" : "bar"}></span>
        <span className={isMobileMenuOpen ? "bar open" : "bar"}></span>
        <span className={isMobileMenuOpen ? "bar open" : "bar"}></span>
      </div>
      <div className={`links ${isMobileMenuOpen ? "show" : ""}`}>
        {localStorage.getItem("token") ? (
          <div>
            <Link
              to={"/"}
              className={`${
                location.pathname === "/" ? "active" : "inactive"
              } Link`}
            >
              Todo
            </Link>
            <Link
              to={"/transaction"}
              className={`${
                location.pathname === "/transaction" ? "active" : "inactive"
              } Link`}
            >
              Transaction
            </Link>
          </div>
        ) : (
          <div>
            <Link
              to={"/login"}
              className={`${
                location.pathname === "/" ? "active" : "inactive"
              } Link`}
            >
              Todo
            </Link>
            <Link
              to={"/login"}
              className={`${
                location.pathname === "/transaction" ? "active" : "inactive"
              } Link`}
            >
              Transaction
            </Link>
          </div>
        )}
        {!localStorage.getItem("token") ? (
          <div>
            <Link to={"/login"}>
              <button className="btn">Login</button>
            </Link>
            <Link to={"/signup"}>
              <button className="btn">SignUp</button>
            </Link>
          </div>
        ) : (
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
