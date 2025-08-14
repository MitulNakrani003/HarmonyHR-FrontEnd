import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import logo from '../assets/logo.png';
import AuthService from '../services/auth.service';
import errorIcon from '../assets/error.svg'; // Import the new SVG icon

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    AuthService.login(username, password).then(
      () => {
        navigate('/home');
        window.location.reload(); // Reload to update auth-dependent components like the header
      },
      (error) => {
        // Default error message
        let resMessage: string;

        if (error.response) {
          if (error.response.status === 401) {
            resMessage = error.response.data?.message || "Invalid username or password.";
          } else {
            resMessage = error.response.data?.message || `Login failed with status: ${error.response.status}`;
          }
        } else if (error.request) {
          resMessage = "Cannot connect to the server.";
        } else {
          resMessage = error.message || "An unexpected error occurred.";
        }

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Harmony HR Logo" className="login-logo" />
      <form onSubmit={handleLogin} noValidate>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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

        {message && (
          <div className="alert alert-danger d-flex align-items-center" role="alert">
            <img
              src={errorIcon}
              alt="Error"
              className="flex-shrink-0 me-2"
              style={{ width: '24px', height: '24px' }}
            />
            <div>
              {message}
            </div>
          </div>
        )}

        <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm me-2"></span>
              )}
              <span>Login</span>
            </button>
            <Link to="/login/register" className="btn btn-secondary w-100">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;