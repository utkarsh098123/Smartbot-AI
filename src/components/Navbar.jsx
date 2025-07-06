import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-logo">SmartBot<span>.AI</span></div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end className="nav-link">
            TechTutor
          </NavLink>
        </li>
        <li>
          <NavLink to="/codemate" className="nav-link">
            CodeMate
          </NavLink>
        </li>
        <li>
          <NavLink to="/projectpal" className="nav-link">
            ProjectPal
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
