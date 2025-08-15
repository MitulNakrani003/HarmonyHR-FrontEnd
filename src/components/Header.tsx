import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import logo from '../assets/logo.png';
import AuthService from '../services/auth.service';
import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [activeLink, setActiveLink] = useState('Home');

  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout(); // This clears the JWT token from localStorage
    navigate('/login');
    window.location.reload(); // Ensures the app state is fully reset
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
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
              <button
                type="button"
                className={`nav-link ${activeLink === 'Home' ? 'active' : ''}`} 
                aria-current={activeLink === 'Home' ? 'page' : undefined}
                onClick={() => setActiveLink('Home')}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${activeLink === 'Employees' ? 'active' : ''}`}
                aria-current={activeLink === 'Employees' ? 'page' : undefined}
                onClick={() => setActiveLink('Employees')}>
                Employees
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${activeLink === 'Reports' ? 'active' : ''}`}
                aria-current={activeLink === 'Reports' ? 'page' : undefined}
                onClick={() => setActiveLink('Reports')}>
                Reports
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link ${activeLink === 'Logout' ? 'active' : ''}`}
                aria-current={activeLink === 'Logout' ? 'page' : undefined}
                onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;