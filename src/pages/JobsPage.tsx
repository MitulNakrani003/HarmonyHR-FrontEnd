import React, { useState, useEffect } from 'react';
import JobsService, { type Job } from '../services/jobs.service';
import JobListingCard from '../components/Jobs/JobListingCard';
import JobsSubHeader from '../components/Jobs/JobsSubHeader';
import DeletePopup from '../components/DeletePopup'; // 1. Import the popup component

function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // 2. Add state for the popup

  const fetchJobs = () => {
    setIsLoading(true);
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
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleToggleSelection = (jobId: number) => {
    setSelectedJobIds((prevSelected) =>
      prevSelected.includes(jobId)
        ? prevSelected.filter((id) => id !== jobId)
        : [...prevSelected, jobId]
    );
  };

  const handleAddJob = () => {
    console.log('Opening Add Job modal...');
  };

  const handleEditJob = () => {
    if (selectedJobIds.length !== 1) return;
    console.log('Editing job with ID:', selectedJobIds[0]);
  };

  // 3. This function now opens the popup instead of using window.confirm
  const handleDeleteJobs = () => {
    if (selectedJobIds.length > 0) {
      setIsDeletePopupOpen(true);
    }
  };

  // 4. This new function contains the logic that runs on confirmation
  const confirmDeactivation = () => {
    if (selectedJobIds.length === 0) return;
    JobsService.deleteJobsByIds(selectedJobIds)
      .then(() => {
        setJobs(jobs.filter(job => !selectedJobIds.includes(job.id)));
        setSelectedJobIds([]);
        setIsDeletePopupOpen(false); // Close popup on success
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || 'Failed to deactivate jobs.';
        setError(errorMessage);
        setIsDeletePopupOpen(false); // Close popup on error
      });
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

    return jobs.map(job => (
      <JobListingCard
        key={job.id}
        job={job}
        isSelected={selectedJobIds.includes(job.id)}
        onSelect={handleToggleSelection}
      />
    ));
  };

  return (
    // Use a fragment to return multiple top-level elements
    <>
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
      {/* 5. Render the popup component */}
      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={confirmDeactivation}
        count={selectedJobIds.length}
      />
    </>
  );
}

export default JobsPage;