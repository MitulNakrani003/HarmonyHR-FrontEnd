import { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import HomeService from '../../services/home.service';
import '../../styles/EmployeeDetailsDashboard.css';
import type { Address } from '../../interfaces/address';

interface EmployeeData {
    empId: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    jobTitle: string;
    address: Address; // Use the Address interface here
}

function EmployeeDetailsDashboard() {
    const [employee, setEmployee] = useState<EmployeeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser?.userId) {
        HomeService.getEmployeeDataByUserId(currentUser.userId).then(
            (response) => {
            setEmployee(response.data);
            setIsLoading(false);
            },
            (err) => {
            const errorMessage =
                err.response?.data?.message || err.message || 'Failed to fetch data.';
            setError(errorMessage);
            setIsLoading(false);
            }
        );
        } else {
        setError("No user is logged in.");
        setIsLoading(false);
        }
    }, []);

    // Helper function to render the component's content
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }

        if (employee) {
            return (
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Welcome, {employee.firstName}!</h2>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            <strong>Employee ID:</strong> {employee.empId}<br />
                            <strong>Full Name:</strong> {employee.firstName} {employee.lastName}<br />
                            <strong>Email:</strong> {employee.email}<br />
                            <strong>Contact:</strong> {employee.contact}<br />
                            <strong>Job Title:</strong> {employee.jobTitle}<br />
                            <strong>Address:</strong> {employee.address.fullAddress}
                        </p>
                    </div>
                </div>
            );
        }

        return <p>No employee data to display.</p>;
    };

    return (
        <div className="dashboard-container">
            {renderContent()}
        </div>
    );
}

export default EmployeeDetailsDashboard;