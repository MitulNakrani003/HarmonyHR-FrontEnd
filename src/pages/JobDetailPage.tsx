import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import JobsService, { type JobDetail } from '../services/jobs.service';
import JobInDetail from '../components/Jobs/JobInDetail';
import '../styles/JobDetailPage.css';
import { BsArrowLeft } from 'react-icons/bs';

function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      JobsService.getJobById(parseInt(jobId, 10))
        .then(response => {
          setJob(response.data);
          setIsLoading(false);
        })
        .catch(_err => {
          setError('Failed to load job details.');
          setIsLoading(false);
        });
    }
  }, [jobId]);

  const renderContent = () => {
    if (isLoading) {
      return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
    }
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
    if (job) {
      return <JobInDetail job={job} />;
    }
    return null;
  };

  return (
    <div className="container job-detail-page-container mt-4">
      <Link to="/jobs" className="btn btn-light mb-4 d-inline-flex align-items-center gap-2">
        <BsArrowLeft /> Back to Listings
      </Link>
      {renderContent()}
    </div>
  );
}

export default JobDetailPage;