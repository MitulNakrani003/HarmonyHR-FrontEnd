import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import logo from '../assets/logo.png';
import '../styles/Header.css';

function Header() {
  const [activeLink, setActiveLink] = useState('Home');

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Company Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`} 
                aria-current="page" 
                href="#"
                onClick={() => setActiveLink('Home')}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'Employees' ? 'active' : ''}`} 
                href="#"
                onClick={() => setActiveLink('Employees')}>
                Employees
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'Reports' ? 'active' : ''}`} 
                href="#"
                onClick={() => setActiveLink('Reports')}>
                Reports
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeLink === 'Logout' ? 'active' : ''}`} 
                href="#"
                onClick={() => setActiveLink('Logout')}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Header;