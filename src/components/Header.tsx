import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../assets/logo.png';
import AuthService from '../services/auth.service';
import '../styles/Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL location

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="Company Logo" />
        </Link>
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
              <Link
                to="/home"
                className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/employees" // Assuming a future /employees route
                className={`nav-link ${location.pathname === '/employees' ? 'active' : ''}`}
              >
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/jobs"
                className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
              >
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link"
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