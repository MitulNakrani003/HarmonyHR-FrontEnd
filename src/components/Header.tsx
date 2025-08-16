import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../assets/logo.png';
import AuthService from '../services/auth.service';
import '../styles/Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonCircle, BsBoxArrowRight, BsList, BsHouseDoor } from 'react-icons/bs';
import { useRef, useEffect } from 'react'; // Import hooks
import { Offcanvas } from 'bootstrap'; // Import Offcanvas class

function Header() {
  const navigate = useNavigate();
  const offcanvasRef = useRef<HTMLDivElement>(null);
  const bsOffcanvas = useRef<Offcanvas | null>(null);

  // Initialize the Bootstrap Offcanvas instance when the component mounts
  useEffect(() => {
    if (offcanvasRef.current) {
      bsOffcanvas.current = new Offcanvas(offcanvasRef.current);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
    window.location.reload();
  };

  // New handler to navigate and then close the menu
  const handleMenuLinkClick = (path: string) => {
    navigate(path);
    bsOffcanvas.current?.hide();
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* Logo on the left */}
          <Link className="navbar-brand" to="/home">
            <img src={logo} alt="Company Logo" />
          </Link>

          {/* Icons on the right in the new order */}
          <div className="d-flex align-items-center ms-auto gap-3">
            {/* 1. Profile Icon */}
            <Link to="/profile" className="header-icon btn" title="Profile">
              <BsPersonCircle size={24} />
            </Link>
            {/* 2. Home Icon */}
            <Link to="/home" className="header-icon btn" title="Home">
              <BsHouseDoor size={24} />
            </Link>
            {/* 3. Logout Icon */}
            <button onClick={handleLogout} className="header-icon btn" title="Logout">
              <BsBoxArrowRight size={24} />
            </button>
            {/* 4. Menu Icon */}
            <button className="header-icon btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" title="Menu">
              <BsList size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* Off-canvas Side Menu */}
      <div ref={offcanvasRef} className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Menu</h5>
          <button type="button" className="btn-close text-reset" onClick={() => bsOffcanvas.current?.hide()} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* Use buttons with the new handler */}
              <button onClick={() => handleMenuLinkClick('/home')} className="nav-link text-start w-100">Home</button>
            </li>
            <li className="nav-item">
              <button onClick={() => handleMenuLinkClick('/employees')} className="nav-link text-start w-100">Employees</button>
            </li>
            <li className="nav-item">
              <button onClick={() => handleMenuLinkClick('/jobs')} className="nav-link text-start w-100">Jobs</button>
            </li>
            {/* Add more links here as needed */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;