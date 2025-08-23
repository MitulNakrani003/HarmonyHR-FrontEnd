// In src/components/Jobs/EditJobForm.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JobsService, { type UpdateJobPayload, type HiringManager, type Department } from '../../services/jobs.service';
import SuccessPopup from '../SuccessPopup';
import useOutsideClick from '../../hooks/useOutsideClick';
import AuthService from '../../services/auth.service'; // 1. Import AuthService

interface EditJobFormProps {
  jobId: string;
}

const EditJobForm: React.FC<EditJobFormProps> = ({ jobId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UpdateJobPayload | null>(null);
  
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState(''); // 1. Add filter state
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const departmentDropdownRef = useRef<HTMLDivElement>(null!);

  const [managers, setManagers] = useState<HiringManager[]>([]);
  const [managerSearch, setManagerSearch] = useState('');
  const [managerFilter, setManagerFilter] = useState(''); // 1. Add filter state
  const [isManagerDropdownOpen, setIsManagerDropdownOpen] = useState(false);
  const managerDropdownRef = useRef<HTMLDivElement>(null!);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useOutsideClick(departmentDropdownRef, () => setIsDepartmentDropdownOpen(false));
  useOutsideClick(managerDropdownRef, () => setIsManagerDropdownOpen(false));

  useEffect(() => {
    // Fetch job data, departments, and managers in parallel
    Promise.all([
      JobsService.getJobForEdit(parseInt(jobId, 10)),
      JobsService.getDepartments(),
      JobsService.getHiringManagers()
    ]).then(([jobResponse, departmentsResponse, managersResponse]) => {
      const jobData = jobResponse.data;
      const depts = departmentsResponse.data;
      const mgrs = managersResponse.data;

      // Set all state from the parallel responses
      setFormData(jobData);
      setDepartments(depts);
      setManagers(mgrs);

      // Pre-fill search fields for dropdowns using the fetched lists
      const initialDept = depts.find(d => d.departmentId === jobData.departmentId);
      if (initialDept) {
        setDepartmentSearch(initialDept.departmentTitle);
      }

      const initialManager = mgrs.find(m => m.empId === jobData.hiringManagerId);
      if (initialManager) {
        setManagerSearch(`${initialManager.firstName} ${initialManager.lastName} (${initialManager.email})`);
      }

      setIsLoading(false);
    }).catch(() => {
      setError("Failed to load job data. Please try again.");
      setIsLoading(false);
    });
  }, [jobId]);

  const validateForm = (): boolean => {
    if (!formData) return false;
    const errors: Record<string, string> = {};
    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required.";
    if (!formData.departmentId) errors.departmentTitle = "Please select a department.";
    if (!formData.jobDescription.trim()) errors.jobDescription = "Job description is required.";
    const minExp = Number(formData.minimumExperience);
    const maxExp = Number(formData.maximumExperience);
    if (minExp <= 0) errors.minimumExperience = "Min experience must be > 0.";
    if (maxExp < minExp) errors.maximumExperience = "Max experience cannot be less than min.";
    if (Number(formData.compensation) <= 0) errors.compensation = "Compensation must be positive.";
    if (!formData.jobAddress.trim()) errors.jobAddress = "Address is required.";
    if (!formData.city.trim()) errors.city = "City is required.";
    if (!formData.state.trim()) errors.state = "State is required.";
    if (!formData.hiringManagerId) errors.hiringManager = "Please select a manager.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDepartmentSelect = (dept: Department) => {
    if (!formData) return;
    setFormData({ ...formData, departmentId: dept.departmentId });
    setDepartmentSearch(dept.departmentTitle);
    setDepartmentFilter(''); // 2. Clear filter on select
    setIsDepartmentDropdownOpen(false);
  };

  const handleManagerSelect = (manager: HiringManager) => {
    if (!formData) return;
    setFormData({ ...formData, hiringManagerId: manager.empId });
    setManagerSearch(`${manager.firstName} ${manager.lastName} (${manager.email})`);
    setManagerFilter(''); // 2. Clear filter on select
    setIsManagerDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || !formData) return;

    // 2. Get the current user
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser?.userId) {
      setError("Authentication error. You must be logged in to update a job.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // 3. Construct the payload, ensuring postedByUserId is the current user's ID
    const payload: UpdateJobPayload = {
        ...formData,
        minimumExperience: Number(formData.minimumExperience),
        maximumExperience: Number(formData.maximumExperience),
        compensation: Number(formData.compensation),
        postedByUserId: currentUser.userId, // Add the logged-in user's ID
    };

    JobsService.updateJob(parseInt(jobId, 10), payload)
      .then(() => {
        setIsLoading(false);
        setSuccessMessage("Job has been updated successfully!");
        setIsSuccessPopupOpen(true);
      })
      .catch(err => {
        setError(err.response?.data?.message || "An error occurred while updating the job.");
        setIsLoading(false);
      });
  };

  const handleAcknowledgeSuccess = () => {
    setIsSuccessPopupOpen(false);
    navigate('/jobs');
  };

  // 3. Update filtering logic to use the new filter state
  const filteredDepartments = departmentFilter
    ? departments.filter(d => d.departmentTitle.toLowerCase().includes(departmentFilter.toLowerCase()))
    : departments;

  const filteredManagers = managerFilter
    ? managers.filter(m => `${m.firstName} ${m.lastName} ${m.email}`.toLowerCase().includes(managerFilter.toLowerCase()))
    : managers;

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error && !isSuccessPopupOpen) return <div className="alert alert-danger">{error}</div>;
  if (!formData) return <p>No job data found.</p>;

  return (
    <>
      <form onSubmit={handleSubmit} className="add-job-form" noValidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="jobTitle" className="form-label">Job Title</label>
            <input type="text" id="jobTitle" name="jobTitle" className={`form-control ${formErrors.jobTitle ? 'is-invalid' : ''}`} value={formData.jobTitle} onChange={handleChange} required />
            {formErrors.jobTitle && <div className="invalid-feedback">{formErrors.jobTitle}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="departmentTitle" className="form-label">Department</label>
            <div className="searchable-dropdown" ref={departmentDropdownRef}>
              {/* 4. Update input handlers */}
              <input type="text" id="departmentTitle" name="departmentTitle" className={`form-control ${formErrors.departmentTitle ? 'is-invalid' : ''}`} placeholder="Search for a department..." value={departmentSearch} onChange={(e) => { const term = e.target.value; setDepartmentSearch(term); setDepartmentFilter(term); setIsDepartmentDropdownOpen(true); if (formData.departmentId) { setFormData(prev => prev ? {...prev, departmentId: 0} : null); } }} onFocus={() => { setIsDepartmentDropdownOpen(true); setDepartmentFilter(''); }} autoComplete="off" />
              {isDepartmentDropdownOpen && (
                <div className="dropdown-menu show">
                  {filteredDepartments.length > 0 ? ( filteredDepartments.map(dept => (<button key={dept.departmentId} type="button" className="dropdown-item" onClick={() => handleDepartmentSelect(dept)}>{dept.departmentTitle}</button>))) : (<span className="dropdown-item-text">No departments found</span>)}
                </div>
              )}
              {formErrors.departmentTitle && <div className="invalid-feedback d-block">{formErrors.departmentTitle}</div>}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">Job Description</label>
          <textarea id="jobDescription" name="jobDescription" className={`form-control ${formErrors.jobDescription ? 'is-invalid' : ''}`} rows={5} value={formData.jobDescription} onChange={handleChange} required></textarea>
          {formErrors.jobDescription && <div className="invalid-feedback">{formErrors.jobDescription}</div>}
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="minimumExperience" className="form-label">Min Experience (Years)</label>
            <input type="number" id="minimumExperience" name="minimumExperience" className={`form-control ${formErrors.minimumExperience ? 'is-invalid' : ''}`} value={formData.minimumExperience} onChange={handleChange} required />
            {formErrors.minimumExperience && <div className="invalid-feedback">{formErrors.minimumExperience}</div>}
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="maximumExperience" className="form-label">Max Experience (Years)</label>
            <input type="number" id="maximumExperience" name="maximumExperience" className={`form-control ${formErrors.maximumExperience ? 'is-invalid' : ''}`} value={formData.maximumExperience} onChange={handleChange} required />
            {formErrors.maximumExperience && <div className="invalid-feedback">{formErrors.maximumExperience}</div>}
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="compensation" className="form-label">Yearly Compensation ($)</label>
            <input type="number" id="compensation" name="compensation" className={`form-control ${formErrors.compensation ? 'is-invalid' : ''}`} value={formData.compensation} onChange={handleChange} required />
            {formErrors.compensation && <div className="invalid-feedback">{formErrors.compensation}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="jobAddress" className="form-label">Address</label>
            <input type="text" id="jobAddress" name="jobAddress" className={`form-control ${formErrors.jobAddress ? 'is-invalid' : ''}`} value={formData.jobAddress} onChange={handleChange} required />
            {formErrors.jobAddress && <div className="invalid-feedback">{formErrors.jobAddress}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" id="city" name="city" className={`form-control ${formErrors.city ? 'is-invalid' : ''}`} value={formData.city} onChange={handleChange} required />
            {formErrors.city && <div className="invalid-feedback">{formErrors.city}</div>}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input type="text" id="state" name="state" className={`form-control ${formErrors.state ? 'is-invalid' : ''}`} value={formData.state} onChange={handleChange} required />
            {formErrors.state && <div className="invalid-feedback">{formErrors.state}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="hiringManager" className="form-label">Hiring Manager</label>
            <div className="searchable-dropdown" ref={managerDropdownRef}>
              {/* 4. Update input handlers */}
              <input type="text" id="hiringManager" name="hiringManager" className={`form-control ${formErrors.hiringManager ? 'is-invalid' : ''}`} placeholder="Search for a manager..." value={managerSearch} onChange={(e) => { const term = e.target.value; setManagerSearch(term); setManagerFilter(term); setIsManagerDropdownOpen(true); if (formData.hiringManagerId) { setFormData(prev => prev ? {...prev, hiringManagerId: 0} : null); } }} onFocus={() => { setIsManagerDropdownOpen(true); setManagerFilter(''); }} autoComplete="off" />
              {isManagerDropdownOpen && (
                <div className="dropdown-menu show">
                  {filteredManagers.length > 0 ? ( filteredManagers.map(mgr => (<button key={mgr.empId} type="button" className="dropdown-item" onClick={() => handleManagerSelect(mgr)}>{`${mgr.firstName} ${mgr.lastName} (${mgr.email})`}</button>))) : (<span className="dropdown-item-text">No managers found</span>)}
                </div>
              )}
              {formErrors.hiringManager && <div className="invalid-feedback d-block">{formErrors.hiringManager}</div>}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/jobs')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      {isSuccessPopupOpen && successMessage && (
        <SuccessPopup message={successMessage} onAcknowledge={handleAcknowledgeSuccess} buttonText="OK" />
      )}
    </>
  );
};

export default EditJobForm;