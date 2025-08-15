import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/MainLayout.css';
import LoginPage from '../pages/LoginPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import RegisterUserPage from '../pages/RegisterUserPage';
import HomePage from '../pages/HomePage';

function MainLayout() {
    const location = useLocation();
    const showHeader = !location.pathname.startsWith('/login');

    return (
        <>  
            {showHeader && <Header />}
            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login/register" element={<RegisterUserPage />} />
                    <Route path="/login/forgotpassword" element={<ForgotPasswordPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </main>
        </>
    );
}

export default MainLayout;
