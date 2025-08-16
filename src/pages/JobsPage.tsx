import React, { useState, useEffect } from 'react';
import JobsService, { type Job } from '../services/jobs.service';
import JobListingCard from '../components/JobListingCard';

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    JobsService.getAllJobs().then(
      (response) => {
        setJobs(response.data);
        setIsLoading(false);
      },
      (err) => {
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to fetch jobs.';
        setError(errorMessage);
        setIsLoading(false);
      }
    );
  }, []); // Empty dependency array ensures this runs only once on mount

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }

    if (jobs.length === 0) {
      return <p className="text-center mt-4">No open positions at this time. Please check back later.</p>;
    }

    // Map over the jobs array and render a card for each job
    return jobs.map(job => <JobListingCard key={job.id} job={job} />);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10 mx-auto">
          <h1 className="mb-4 text-center">Current Openings</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;