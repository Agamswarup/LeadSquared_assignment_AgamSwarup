import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import "./nav.css";// importing nav.css file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the menu when the screen is resized above 769px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 769) {
        setIsOpen(false); // Close menu on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="title">
        <p className="lead">Lead</p>
        <p className="squared">Squared</p>
        <p className="assignment"> assignment</p>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        {/* Profile links with Icons */}
        <p>Candidate - Agam Swarup</p>
        <a
          href="https://github.com/Agamswarup"
          className="navbar-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="icon" />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/agam-swarup-b82aa0217/"
          className="navbar-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icon" />
          LinkedIn
        </a>
        <a
          href="https://leetcode.com/u/agam_swarup/"
          className="navbar-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCode className="icon" />
          LeetCode
        </a>
      </div>

      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </div>

      {/* Display links in hamburger for smaller screens */}
      {isOpen && (
        <div className="navbar-links-hamburger">
          <a
            href="https://github.com/Agamswarup"
            className="navbar-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="icon" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/agam-swarup-b82aa0217/"
            className="navbar-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="icon" />
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/agam_swarup/"
            className="navbar-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaCode className="icon" />
            LeetCode
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
