import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import the new Footer component
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterUserPage from '../pages/RegisterUserPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import AuthService from '../services/auth.service';
import '../styles/MainLayout.css';
import JobsPage from '../pages/JobsPage';

function MainLayout() {
    const location = useLocation();
    const currentUser = AuthService.getCurrentUser();
    const isAuthPage = location.pathname === '/login' || location.pathname.startsWith('/register') || location.pathname.startsWith('/login/forgotpassword');

    return (
        <div className="d-flex flex-column min-vh-100">
            {!isAuthPage && <Header />}
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterUserPage />} />
                    <Route path="/home" element={currentUser ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/jobs" element={currentUser ? <JobsPage /> : <Navigate to="/login" />} />
                    <Route path="/login/forgotpassword" element={<ForgotPasswordPage />} />
                    <Route path="*" element={<Navigate to={currentUser ? "/home" : "/login"} />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
}

export default MainLayout;
