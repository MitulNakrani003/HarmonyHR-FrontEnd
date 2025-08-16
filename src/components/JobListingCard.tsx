import React from 'react';
import type { Job } from '../services/jobs.service';
import '../styles/JobListingCard.css';
import { BsGeoAlt, BsBuilding, BsCalendar, BsBriefcase } from 'react-icons/bs';

interface JobListingCardProps {
  job: Job;
}

// Helper to format the date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  return (
    <div className="card job-listing-card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title">{job.position}</h5>
            <div className="job-meta">
              <span><BsBuilding /> {job.department}</span>
              <span><BsGeoAlt /> {job.location}</span>
            </div>
          </div>
          <button className="btn btn-primary apply-btn">Apply Now</button>
        </div>
        <hr />
        <div className="job-details">
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
  );
};

export default JobListingCard;