// In src/pages/EditJobPage.tsx

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import EditJobForm from '../components/Jobs/EditJobForm';
import '../styles/EditJobPage.css';

const EditJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();

  return (
    <div className="container add-job-page-container mt-4">
      <Link to="/jobs" className="btn btn-light mb-4 d-inline-flex align-items-center gap-2">
        <BsArrowLeft /> Back to Listings
      </Link>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4 page-heading">Edit Job Posting</h1>
          {jobId ? <EditJobForm jobId={jobId} /> : <p>Invalid Job ID.</p>}
        </div>
      </div>
    </div>
  );
};

export default EditJobPage;