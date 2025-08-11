import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/MainLayout.css';
import LoginPage from '../pages/LoginPage';

// A placeholder for your main content after login
function HomePage() {
    return <h2 style={{textAlign: 'center', marginTop: '20px'}}>Welcome to the Dashboard</h2>;
}

function MainLayout() {
    const location = useLocation();
    const showHeader = location.pathname !== '/login';

    return (
        <>  
            {showHeader && <Header />}
            <main>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </main>
        </>
    );
}

export default MainLayout;
