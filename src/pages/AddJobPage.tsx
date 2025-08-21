import React from 'react';
import { Link } from 'react-router-dom'; // Import Link instead of useNavigate
import { BsArrowLeft } from 'react-icons/bs';
import AddJobForm from '../components/Jobs/AddJobForm';
import '../styles/AddJobPage.css';

const AddJobPage: React.FC = () => {
  return (
    <div className="container add-job-page-container mt-4">
      {/* This link is now identical to the one on JobDetailPage */}
      <Link to="/jobs" className="btn btn-light mb-4 d-inline-flex align-items-center gap-2">
        <BsArrowLeft /> Back to Listings
      </Link>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Create New Job Posting</h1>
          <AddJobForm />
        </div>
      </div>
    </div>
  );
};

export default AddJobPage;