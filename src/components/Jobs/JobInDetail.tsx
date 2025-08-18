import React from 'react';
import type { JobDetail } from '../../services/jobs.service';
import '../../styles/JobInDetail.css';
import { BsBuilding, BsGeoAlt, BsBriefcase, BsCashCoin, BsPerson, BsFillPersonVcardFill } from 'react-icons/bs';

interface JobInDetailProps {
  job: JobDetail;
}

const JobInDetail: React.FC<JobInDetailProps> = ({ job }) => {
  return (
    <div className="job-in-detail-container">
      <div className="detail-header">
        <h1>{job.position}</h1>
        <p className="text-muted">{job.department} &middot; {job.location}</p>
        <button className="btn btn-primary apply-btn-lg">Apply Now</button>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="card detail-card">
            <div className="card-body">
              <h5 className="card-title">Job Description</h5>
              <p className="card-text">{job.description}</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card detail-card">
            <div className="card-body">
              <h5 className="card-title">Key Details</h5>
              <ul className="list-unstyled key-details-list">
                <li><BsBriefcase /> <strong>Experience:</strong> {job.minExperience} - {job.maxExperience} years</li>
                <li><BsCashCoin /> <strong>Compensation:</strong> {job.compensation}</li>
                <li><BsGeoAlt /> <strong>Address:</strong> {job.fullAddress}</li>
                <li><BsPerson /> <strong>Hiring Manager:</strong> {job.hiringManager}</li>
                <li><BsFillPersonVcardFill /> <strong>Posted By:</strong> {job.postedBy}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobInDetail;