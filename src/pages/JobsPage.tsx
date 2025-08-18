import React, { useState, useEffect } from 'react';
import JobsService, { type Job } from '../services/jobs.service';
import JobListingCard from '../components/Jobs/JobListingCard';
import JobsSubHeader from '../components/Jobs/JobsSubHeader';

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);

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

  const handleAddJob = () => {
    console.log('Opening Add Job modal...');
    // Logic to show a form or navigate to an "add job" page
  };

  const handleEditJob = () => {
    console.log('Editing job with ID:', selectedJobIds[0]);
    // Logic to show an edit form for the selected job
  };

  const handleDeleteJobs = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedJobIds.length} job(s)?`)) {
      console.log('Deleting jobs with IDs:', selectedJobIds);
      // Logic to call the delete API endpoint
    }
  };

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
      <JobsSubHeader
        onAdd={handleAddJob}
        onEdit={handleEditJob}
        onDelete={handleDeleteJobs}
        selectedJobsCount={selectedJobIds.length}
      />
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