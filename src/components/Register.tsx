import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, type FormEvent, useEffect } from 'react';
import AuthService from '../services/auth.service';
import SuccessPopup from './SuccessPopup'; // Import the new component

// The Role interface is no longer needed as the API returns a string array.

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add state for the checkbox
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState<string[]>([]); // State now holds an array of strings
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for popup visibility
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- Fetch roles when the component mounts ---
  useEffect(() => {
    AuthService.getRoles().then(
      (response) => {
        setRoles(response.data);
      },
      (error) => {
        console.error("Failed to fetch roles", error);
        setErrors(prev => ({...prev, role: 'Could not load roles.'}));
      }
    );
  }, []); // Empty dependency array ensures this runs only once on mount

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    if (!role) newErrors.role = 'Please select a role.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage('');

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    // Call the register service with the correct arguments to match the backend
    AuthService.register(username, email, password, role).then(
      (response) => {
        // Set the success message and show the popup
        setMessage(response.data.message || 'Registration successful!');
        setIsLoading(false);
        setShowSuccessPopup(true);
      },
      (error) => {
        const resMessage =
          error.response?.data?.message ||
          error.message ||
          error.toString();
        
        setIsLoading(false);
        setMessage(resMessage); // This will now display in the error alert
      }
    );
  };

  // Handler to close the popup and navigate
  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/login');
  };

  // --- Helper to format role names for display ---
  const formatRoleName = (name: string) => {
    if (typeof name !== 'string' || !name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <>
      {showSuccessPopup && <SuccessPopup message={message} onClose={handlePopupClose} />}
      <div className="login-container">
        <img src={logo} alt="Harmony HR Logo" className="login-logo" />
        <h2 className="text-center mb-3">Create Your Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          {/* --- Role Dropdown --- */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select 
              className={`form-select ${errors.role ? 'is-invalid' : ''}`}
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>Select a Role...</option>
              {/* Map over the array of strings */}
              {roles.map((roleName) => (
                <option key={roleName} value={roleName}>
                  {formatRoleName(roleName)}
                </option>
              ))}
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <div className="mb-3 form-check">
              <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="showPasswordCheck"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPasswordCheck">Show Password</label>
          </div>

          {/* This message state now handles registration errors */}
          {message && !showSuccessPopup && (
            <div className="alert alert-danger mt-3" role="alert">
              {message}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </>
  );
}

export default Register;