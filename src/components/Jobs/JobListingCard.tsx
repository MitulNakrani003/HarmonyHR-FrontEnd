import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../../services/jobs.service';
import '../../styles/JobListingCard.css';
import { BsGeoAlt, BsBuilding, BsCalendar, BsBriefcase, BsChevronDown } from 'react-icons/bs';

interface JobListingCardProps {
  job: Job;
  isSelected: boolean;
  onSelect: (jobId: number) => void;
}

// Helper to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobListingCard: React.FC<JobListingCardProps> = ({ job, isSelected, onSelect }) => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/jobs/${job.id}`);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Applying for job ${job.id}`);
  };

  // This handler is now only for the checkbox
  const handleSelectionChange = () => {
    onSelect(job.id);
  };

  const handleToggleDetails = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any other clicks from firing
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    // The main div no longer handles clicks for selection
    <div className={`card job-listing-card mb-3 ${isSelected ? 'selected' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <input
              type="checkbox"
              className="form-check-input selection-checkbox"
              checked={isSelected}
              onChange={handleSelectionChange} // Use onChange for checkbox
              onClick={(e) => e.stopPropagation()} // Stop propagation on click as well
            />
            <div>
              <h5 className="card-title">{job.position}</h5>
              <div className="job-meta">
                <span><BsBuilding /> {job.department}</span>
                <span><BsGeoAlt /> {job.location}</span>
                {/* Updated inline toggle - now just an arrow */}
                <span className="more-toggle ms-3" onClick={handleToggleDetails}>
                  <BsChevronDown className={`toggle-arrow ${isDetailsOpen ? 'open' : ''}`} />
                </span>
              </div>
            </div>
          </div>
          {/* Button Group */}
          <div className="d-flex flex-column flex-sm-row gap-2 align-items-end">
            <button className="btn btn-secondary more-btn" onClick={handleDetailsClick}>Details</button>
            <button className="btn btn-primary apply-btn" onClick={handleApplyClick}>Apply Now</button>
          </div>
        </div>

        {/* Collapsible Content - <hr /> is removed */}
        <div className={`collapsible-content ${isDetailsOpen ? 'open' : ''}`}>
          <div className="job-details pt-3">
            <span>
              <BsCalendar />
              <strong>Date Posted:</strong> {formatDate(job.datePosted)}
            </span>
            <span>
              <BsBriefcase />
              <strong>Experience:</strong> {job.minExperience} - {job.maxExperience} years
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;