import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Forgot.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Import the logo

function ForgotPassword() {
  return (
    <div className="login-container"> {/* Use the same container class as Login */}
      <img src={logo} alt="Harmony HR Logo" className="login-logo" />
      <h2 className="text-center mb-3">Forgot Your Password?</h2>
      <p className="text-muted text-center">
        Enter your username and email, and we'll send you reset instructions.
      </p>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Associated Email Address</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Send Reset Instructions</button>
      </form>
      <div className="text-center mt-3">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;