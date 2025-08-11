import { useState } from 'react';
import '../styles/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust path to your logo file


function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
    <div className="login-container">
        <img src={logo} alt="Harmony HR Logo" className="login-logo" />
        <form>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" />
                <div id="usernameHelp" className="form-text">We'll never share your username or password with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type={showPassword ? 'text' : 'password'} className="form-control" id="password" />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id="showPasswordCheck"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label" htmlFor="showPasswordCheck">Show Password</label>
                </div>
                <Link to="/login/forgotpassword" className="forgot-password-link">Forgot Password?</Link>
            </div>
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary w-100">Submit</button>
                <Link to="/register" className="btn btn-secondary w-100">Register</Link>
            </div>
        </form>
    </div>
    </>
  )
}

export default Login
